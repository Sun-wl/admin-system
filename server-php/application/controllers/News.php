<?php
require APPPATH . '/libraries/REST_Controller.php';
class News extends REST_Controller{
	public $PAGE_SIZE = 50;
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
    public function index_post(){
        $this->db->set("title",$this->post("title"));
        $this->db->set("content",$this->post("content"));
        $this->db->set("create_time",date('Y-m-d H:i:s'));
        $this->db->insert("news");
        $this->set_response(['id'=>$this->db->insert_id()], REST_Controller::HTTP_CREATED);
    }
    public function index_get(){
        $id = $this->get("id");
        if($id!=null){
            $this->response($this->db->get_where("news",array('id'=>$id))->result()[0]);
        }
        else{
            $search = $this->get("search");
            $page = $this->get("page");
            if($page==null)$page="1";
            $page = intval($page);
            $this->db->like('title',$search);
            $total_count = $this->db->count_all_results("news");
            $page_count = floor($total_count/$this->PAGE_SIZE);
            if($total_count%$this->PAGE_SIZE>0)$page_count++;
            $this->db->like('title',$search);
            $this->db->order_by("create_time",'DESC');
            $offset = $this->PAGE_SIZE*($page-1);
            $this->db->limit($this->PAGE_SIZE,$offset);
            $results = $this->db->get("news")->result();
            $data = [
                "total_count" => $total_count,
                "page_count" => $page_count,
                "next" => $page<$page_count,
                "previous" => $page>1,
                "results" => $results,
            ];
            $this->response($data);
        }
    }
    public function index_put(){
        $this->db->set("title",$this->put("title"));
        $this->db->set("content",$this->put("content"));
        $this->db->where("id",$this->get("id"));
        $this->db->update("news");
        $this->set_response('', REST_Controller::HTTP_NO_CONTENT);
    }
    public function index_delete(){
        $this->db->where("id",$this->get("id"));
        $this->db->delete("news");
        $this->set_response('', REST_Controller::HTTP_NO_CONTENT);
    }
	public function deletes_delete(){
        $ids = split(",",$this->input->get("ids"));
        foreach($ids as $id){
            $this->db->where("id",$id);
            $this->db->delete("news");
        }
        $this->set_response('', REST_Controller::HTTP_NO_CONTENT);
    }
}