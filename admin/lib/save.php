<?php

$data =stripslashes($_POST['data']);
if (isset($data)) {
	$saveData = new SaveData();
	$saveData->backupData();
	$saveData -> checkData(urldecode($data));
	$myFile = "../../data.json";
	$fh = fopen($myFile, 'w') or die("can't open file");

	fwrite($fh, json_encode($saveData -> data));
	fclose($fh);
	echo "done";
} else {
	echo "error";
}

Class SaveData {
	const DATA_URL = "../../data.json";
	const BK_DATA_URL = "../resource/data/bk.json";
	const IMAGE_FOLDER = "../resource/image/";
	public $data;
	public function backupData()
	{
		$content = file_get_contents(SaveData::DATA_URL, true);
		file_put_contents(SaveData::BK_DATA_URL,$content);

	}
	public function checkData($val) {
		$this -> data = json_decode($val);

		
		
			foreach ($this->data as $site) {
				for ($a = 0; $a < sizeof($site); $a++) {
					$this -> checkType($site[$a]);
				}
	
			}
		
	}

	private function checkType($obj) {
		switch($obj->type) {
			case "image" :
				$this -> saveImage($obj);
				break;
		}
	}

	private function saveImage($obj) {
		if ($_FILES[$obj -> id]["error"] && $_FILES[$obj -> id]["error"] > 0) {
			echo "Error: " . "<br>";
		} else if($_FILES[$obj -> id]) {
			if ($obj -> value && file_exists($obj -> value))
				unlink($obj -> value);
			move_uploaded_file($_FILES[$obj -> id]["tmp_name"], SaveData::IMAGE_FOLDER . $_FILES[$obj -> id]['name']);
			echo "<script>parent.setImageName({'id':'" . $obj -> id . "','name':'" . $_FILES[$obj -> id]["name"] . "'});</script>";
			$obj -> value = $_FILES[$obj -> id]["name"];
		}
	}

	

}
?>