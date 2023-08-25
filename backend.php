<?php
header("Access-Control-Allow-Origin: *");

class Calculator {
    public function calculateAverage($data) {
        if (
            isset($data['input1']) && is_numeric($data['input1']) &&
            isset($data['input2']) && is_numeric($data['input2']) &&
            isset($data['input3']) && is_numeric($data['input3'])
        ) {
            $averagePercentage = ($data['input1'] + $data['input2'] + $data['input3']) / 3;
            return ['averagePercentage' => $averagePercentage];
        } else {
            return ['error' => 'Invalid input data'];
        }
    }
}

$calculator = new Calculator();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents("php://input"), true);

    $result = $calculator->calculateAverage($postData);
    header('Content-Type: application/json');
    echo json_encode($result);
}
?>