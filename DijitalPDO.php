<?php



class DijitalPDO extends PDO
{
	public static $log = array();

	function __construct($dsn, $username = "", $password = "", $driver_options = array())
	{
		parent::__construct($dsn, $username, $password, $driver_options);
		$this->setAttribute(PDO::ATTR_STATEMENT_CLASS, array(
			'MyPDOStatement',
			array($this)
		));
	}
}


class MyPDOStatement extends PDOStatement
{
	const NO_MAX_LENGTH = -1;

	protected $connection;
	protected $bound_params = array();

	protected function __construct(PDO $connection)
	{
		$this->connection = $connection;
	}

	public function execute($bound_input_params = NULL)
	{
		$start = microtime(true);
		$result = parent::execute($bound_input_params);
        $time = microtime(true) - $start;
		DijitalPDO::$log[] = array(
			'query' => self::getSQL($bound_input_params),
			'time' => round($time * 1000, 6)
		);
        return $result;
    }

	public function bindParam($paramno, &$param, $type = PDO::PARAM_STR, $maxlen = NULL, $driverdata = NULL)
	{
		$this->bound_params[$paramno] = array(
			'value' => &$param,
			'type' => $type,
			'maxlen' => (is_null($maxlen)) ? self::NO_MAX_LENGTH : $maxlen,
			// ignore driver data
		);

		$result = parent::bindParam($paramno, $param, $type, $maxlen, $driverdata);
	}

	public function bindValue($parameter, $value, $data_type = PDO::PARAM_STR)
	{
		$this->bound_params[$parameter] = array(
			'value' => $value,
			'type' => $data_type,
			'maxlen' => self::NO_MAX_LENGTH
		);
		parent::bindValue($parameter, $value, $data_type);
	}

	public function getSQL($values = array())
	{
		$sql = $this->queryString;
		if(count($values) > 0)
		{
			$toFind = '?';
			$start = 0;
			$key = 0;
			while(($pos = strpos(($sql), $toFind, $start)) != false)
			{
				$data = $this->connection->quote(isset($values[$key]) ? $values[$key] : '');
				$sql = substr_replace($sql, $data, $pos, 1);
				$start = $pos + mb_strlen($data, 'UTF-8'); // start searching from next position.
				$key++;
			}
		}

		if(count($this->bound_params) > 0)
		{
			foreach($this->bound_params as $key => $param)
			{
				$value = $param['value'];

				if(!is_null($param['type']))
				{
					$value = self::cast($value, $param['type']);
				}
				if($param['maxlen'] && $param['maxlen'] != self::NO_MAX_LENGTH)
				{
					$value = self::truncate($value, $param['maxlen']);
				}

				if(!is_null($value))
				{
					$sql = str_replace($key, $this->connection->quote($value), $sql);
				}
				else
				{
					$sql = str_replace($key, 'NULL', $sql);
				}
			}
		}

		//echo '<pre>', print_r($this->bound_params), '</pre>';

		return $sql;
	}

	static protected function cast($value, $type)
	{
		switch($type)
		{
			case PDO::PARAM_BOOL:
				return (bool) $value;
				break;
			case PDO::PARAM_NULL:
				return NULL;
				break;
			case PDO::PARAM_INT:
				return (int) $value;
			case PDO::PARAM_STR:
			default:
				return $value;
		}
	}

	static protected function truncate($value, $length)
	{
		return substr($value, 0, $length);
	}
}