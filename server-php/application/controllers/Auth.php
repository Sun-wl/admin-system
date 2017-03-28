<?php
require APPPATH . '/libraries/REST_Controller.php';
class Auth extends REST_Controller{
    function __construct() {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: Authorization,Content-Type");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }
        parent::__construct();
    }
    public function info_get(){
        $this->response([
        'name' => 'admin',
    ]);
    }
}