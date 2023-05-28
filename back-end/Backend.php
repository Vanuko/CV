<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data_base = mysqli_connect('localhost', 'root', '', 'cv_form');
mysqli_set_charset($data_base,"utf8");

$payload = file_get_contents('php://input');

function dump($data_or_json) {
    if ( is_array($data_or_json) or is_object($data_or_json) ) {
        print json_encode($data_or_json);
    } else {
        print $data_or_json;
    }
}

$TestData = "SELECT * FROM base_data left join address_data on base_data.ID = address_data.ID_base_data
    left join work_data on base_data.ID = work_data.ID_base_data
    left join education_data on base_data.ID = education_data.ID_base_data
    left join custom_data on base_data.ID = custom_data.ID_base_data";

$result = mysqli_query($data_base, $TestData);
// $data = mysqli_fetch_assoc($result);
while($cv = mysqli_fetch_assoc($result)){
    dump($cv);
}
// dump($data);
exit;


// $decodedPayload = json_decode($payload["data"])
// $decodedPayload = json_decode($payload);
// dump($decodedPayload);
// dump($decodedPayload->functionName);
// dump($decodedPayload->data->ID);
// dump($decodedPayload['data']['data']);

// if (isset($decodedPayload['functionName']) && isset($decodedPayload['data'])) {
//     $functionName = $decodedPayload['functionName'];
//     $requestData = $decodedPayload['data'];
//     echo $decodedPayload;
// }
// echo $decodedPayload;
// exit;

// if (isset($_POST['registret_lietotaju'])) {
//     // paņem visus datus no lietotāja izmantjot vairākas funkcijas, lai pasargātu no ļaunprātīgiem ierakstiem
//     $vards = trim(htmlspecialchars(mysqli_real_escape_string($datu_baze, $_POST['vards'])));
//     $uzvards = trim(htmlspecialchars(mysqli_real_escape_string($datu_baze, $_POST['uzvards'])));
//     $e_pasts = trim(htmlspecialchars(mysqli_real_escape_string($datu_baze, $_POST['e_pasts'])));
//     $parole_1 = trim(htmlspecialchars(mysqli_real_escape_string($datu_baze, $_POST['parole_1'])));
//     $parole_2 = trim(htmlspecialchars(mysqli_real_escape_string($datu_baze, $_POST['parole_2'])));

//     // Lietotāja datu pārbaude
//     if(empty($vards)){ $kludas[]="nepieciešams Vārds"; }
//     if(strlen($vards) > '50'){ $kludas[]="vārds ir garāks par 50 simboliem"; }
//     if(empty($uzvards)){ $kludas[]="nepieciešams Uzvārds"; }
//     if(strlen($uzvards) > '50'){ $kludas[]="uzvārds ir garāks par 50 simboliem"; }
//     if(empty($e_pasts)){ $kludas[]="nepieciešams E-Pasts"; }
//     if(strlen($e_pasts) > '60'){ $kludas[]="E-Pasts ir garāks par 60 simboliem"; }
//     if(empty($parole_1)){ $kludas[]="nepieciešama Parole";
//         }else{
//             if(strlen($parole_1) < '10'){ $kludas[]="parolei jābūt vismaz 10 simbolu garumā"; }
//             if(strlen($parole_1) > '100'){ $kludas[]="parole ir garāka par 100 simboliem";
//             }else{
//                 if(!preg_match("#[0-9]+#",$parole_1)){ $kludas[]="nepieciešams cipars parolē"; }
//                 if(!preg_match("#[A-Z]+#",$parole_1)){ $kludas[]="nepieciešams lielais burts parolē"; }
//                 if(!preg_match("#[a-z]+#",$parole_1)){ $kludas[]="nepieciešams mazais burts parolē"; }
//             }
//         }
//     if($parole_1 != $parole_2){ $kludas[]= "Ievadītās paroles nesakrīt"; }

//     // E-Pasta pieejamības pārbaude
//     $pieprasijums = "SELECT * FROM konts WHERE e_pasts= BINARY '$e_pasts'";
//     $rezultats = mysqli_query($datu_baze, $pieprasijums);
//     $lietotajs = mysqli_fetch_assoc($rezultats);
//     if($lietotajs){
//         if ($lietotajs['e_pasts'] === $e_pasts){
//             $kludas[]="Lietotājs ar šādu E-Pastu jau ir reģistrēts";
//         }
//     }

    // // ja nav kļūdu tad reģistrē lietotāju
    // if (count($kludas) == 0) {
    //     mysqli_set_charset($datu_baze,"utf8");
    //     $parole = password_hash($parole_1, PASSWORD_DEFAULT);
    //     $ievietojamais = "INSERT INTO konts (vards, uzvards, e_pasts, parole)
    //         VALUES('$vards', '$uzvards', '$e_pasts', '$parole')";
    //     $registracija = mysqli_query($datu_baze, $ievietojamais);
    //     if($registracija) {
    //         $id_konts = $datu_baze->insert_id;
    //         $_SESSION['e_pasts'] = $e_pasts;
    //         $_SESSION['id_konts'] = (int) $id_konts;
    //         header('location: index.php');
    //     }else{
    //         $kludas[]="radās kļūda, mēģiniet vēlāk";
    //     }
    // }
// }
?>