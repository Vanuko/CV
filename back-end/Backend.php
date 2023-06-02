<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data_base = mysqli_connect('localhost', 'root', '', 'cv_form');
mysqli_set_charset($data_base,"utf8");

$payload = file_get_contents('php://input');
$decodedPayload = json_decode($payload);

function dump($data_or_json) {
    if ( is_array($data_or_json) or is_object($data_or_json) ) {
        print json_encode($data_or_json);
    } else {
        print $data_or_json;
    }
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST' && isset($_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'])) {
    $method = $_SERVER['HTTP_X_HTTP_METHOD_OVERRIDE'];
}

if ($method === "GET") {
    $functionName = $_GET['functionName'];
    if ($functionName === "getCV") {
        $baseData = "SELECT * FROM base_data";
        $result = mysqli_query($data_base, $baseData);
        $data = array();
        $keyNameArray = [];
        $keyNameArray['address'] = "SELECT * FROM address_data WHERE address_data.ID_base_data = ?";
        $keyNameArray['work'] = "SELECT * FROM work_data WHERE work_data.ID_base_data = ?";
        $keyNameArray['education'] = "SELECT * FROM education_data WHERE education_data.ID_base_data = ?";
        $keyNameArray['custom'] = "SELECT * FROM custom_data WHERE custom_data.ID_base_data = ?";
        
        while ($row = mysqli_fetch_assoc($result)) {
            foreach ($keyNameArray as $index => $keyName) {
                $stmt = mysqli_prepare($data_base, $keyName);
                mysqli_stmt_bind_param($stmt, 'i', $row['ID']);
                mysqli_stmt_execute($stmt);
                $innerResult = mysqli_stmt_get_result($stmt);
                $row[$index] = mysqli_fetch_all($innerResult, MYSQLI_ASSOC);
            }
            $data[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
} else {
    if (isset($decodedPayload->functionName) && isset($decodedPayload->data)) {
        $functionName = $decodedPayload->functionName;
        $requestData = $decodedPayload->data;
        if($method == "POST" && $functionName == "saveCV"){
            $baseData = "INSERT INTO base_data (name, surname, phone_nr, email) VALUES (?, ?, ?, ?)";
            $stmt = mysqli_prepare($data_base, $baseData);
            mysqli_stmt_bind_param($stmt, 'ssss', $requestData->name, $requestData->surname, $requestData->phone_nr, $requestData->email);
            mysqli_stmt_execute($stmt);
            $id_base_data = $data_base->insert_id;
            
            if(isset($requestData->work)){
            foreach($requestData->work as $work){
                $workData = "INSERT INTO work_data (ID_base_data, work_place, work_position, work_load, work_experience) VALUES (?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($data_base, $workData);
                mysqli_stmt_bind_param($stmt, 'isssd', $id_base_data, $work->work_place, $work->work_position, $work->work_load, $work->work_experience);
                mysqli_stmt_execute($stmt);
            }}
            if(isset($requestData->education)){
            foreach($requestData->education as $education){
                $educationData = "INSERT INTO education_data (ID_base_data, education_institution, education_faculty, education_field_of_study, education_level,
                education_status, education_time_spent) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($data_base, $educationData);
                mysqli_stmt_bind_param($stmt, 'isssssd', $id_base_data, $education->education_institution, $education->education_faculty, $education->education_field_of_study,
                $education->education_level, $education->education_status, $education->education_time_spent);
                mysqli_stmt_execute($stmt);
            }}
            if(isset($requestData->address)){
            foreach($requestData->address as $address){
                $addressData = "INSERT INTO address_data (ID_base_data, address_country, address_index, address_city, address_street,
                address_number) VALUES (?, ?, ?, ?, ?, ?)";
                $stmt = mysqli_prepare($data_base, $addressData);
                mysqli_stmt_bind_param($stmt, 'isssss', $id_base_data, $address->address_country, $address->address_index, $address->address_city,
                $address->address_street, $address->address_number);
                mysqli_stmt_execute($stmt);
            }}
            if(isset($requestData->custom)){
            foreach($requestData->custom as $custom){
                $customData = "INSERT INTO custom_data (ID_base_data, custom_name, custom_value) VALUES (?, ?, ?)";
                $stmt = mysqli_prepare($data_base, $customData);
                mysqli_stmt_bind_param($stmt, 'iss', $id_base_data, $custom->custom_name, $custom->custom_value);
                mysqli_stmt_execute($stmt);
            }}
        } else if($method == "POST" && $functionName == "updateCV"){
            $baseData = "UPDATE base_data SET name = ?, surname = ?, phone_nr = ?, email = ? WHERE ID = ? ";
            $stmt = mysqli_prepare($data_base, $baseData);
            mysqli_stmt_bind_param($stmt, 'ssssi', $requestData->name, $requestData->surname, $requestData->phone_nr, $requestData->email,  $requestData->ID);
            mysqli_stmt_execute($stmt);
            $id_base_data = $data_base->insert_id;
            $deletion = "DELETE address_data, work_data, education_data, custom_data
            FROM base_data
            LEFT JOIN address_data ON address_data.ID_base_data = base_data.ID
            LEFT JOIN work_data ON work_data.ID_base_data = base_data.ID
            LEFT JOIN education_data ON education_data.ID_base_data = base_data.ID
            LEFT JOIN custom_data ON custom_data.ID_base_data = base_data.ID
            WHERE base_data.ID = ?";
            $stmt = mysqli_prepare($data_base, $deletion);
            mysqli_stmt_bind_param($stmt, 'i', $requestData->ID);
            mysqli_stmt_execute($stmt);
        
            if(isset($requestData->work)){
                foreach($requestData->work as $work){
                    $workData = "INSERT INTO work_data (ID_base_data, work_place, work_position, work_load, work_experience) VALUES (?, ?, ?, ?, ?)";
                    $stmt = mysqli_prepare($data_base, $workData);
                    mysqli_stmt_bind_param($stmt, 'isssd', $requestData->ID, $work->work_place, $work->work_position, $work->work_load, $work->work_experience);
                    mysqli_stmt_execute($stmt);
                }}
                if(isset($requestData->education)){
                foreach($requestData->education as $education){
                    $educationData = "INSERT INTO education_data (ID_base_data, education_institution, education_faculty, education_field_of_study, education_level,
                    education_status, education_time_spent) VALUES (?, ?, ?, ?, ?, ?, ?)";
                    $stmt = mysqli_prepare($data_base, $educationData);
                    mysqli_stmt_bind_param($stmt, 'isssssd', $requestData->ID, $education->education_institution, $education->education_faculty, $education->education_field_of_study,
                    $education->education_level, $education->education_status, $education->education_time_spent);
                    mysqli_stmt_execute($stmt);
                }}
                if(isset($requestData->address)){
                foreach($requestData->address as $address){
                    $addressData = "INSERT INTO address_data (ID_base_data, address_country, address_index, address_city, address_street,
                    address_number) VALUES (?, ?, ?, ?, ?, ?)";
                    $stmt = mysqli_prepare($data_base, $addressData);
                    mysqli_stmt_bind_param($stmt, 'isssss', $requestData->ID, $address->address_country, $address->address_index, $address->address_city,
                    $address->address_street, $address->address_number);
                    mysqli_stmt_execute($stmt);
                }}
                if(isset($requestData->custom)){
                foreach($requestData->custom as $custom){
                    $customData = "INSERT INTO custom_data (ID_base_data, custom_name, custom_value) VALUES (?, ?, ?)";
                    $stmt = mysqli_prepare($data_base, $customData);
                    mysqli_stmt_bind_param($stmt, 'iss', $requestData->ID, $custom->custom_name, $custom->custom_value);
                    mysqli_stmt_execute($stmt);
                }}
        }
        else if($method == "DELETE" && $functionName == "deleteCV"){
            $ID = $requestData->ID;
            $deletion = "DELETE base_data, address_data, work_data, education_data, custom_data
            FROM base_data
            left join address_data on base_data.ID = address_data.ID_base_data
            left join work_data on base_data.ID = work_data.ID_base_data
            left join education_data on base_data.ID = education_data.ID_base_data
            left join custom_data on base_data.ID = custom_data.ID_base_data
            WHERE base_data.ID = ?";
            $stmt = mysqli_prepare($data_base, $deletion);
            mysqli_stmt_bind_param($stmt, 'i', $ID);
            mysqli_stmt_execute($stmt);
        }
    }
}
?>