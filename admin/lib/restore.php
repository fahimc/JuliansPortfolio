<?php

$data = $_POST['id'];
if (isset($data)) {
	$saveData = new SaveData();
	$saveData->backupData();
	echo "done";
} else {
	echo "error";
}

Class SaveData {
	const DATA_URL = "../../data.json";
	const BK_DATA_URL = "../resource/data/bk.json";
	const IMAGE_FOLDER = "../resource/image/";
	public function backupData()
	{
		$data = file_get_contents(SaveData::BK_DATA_URL, true);
		file_put_contents(SaveData::DATA_URL,$data);
	}
}
?>