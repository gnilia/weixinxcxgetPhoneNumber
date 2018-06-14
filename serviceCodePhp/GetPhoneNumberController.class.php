<?php
namespace Api\Controller;
use Think\Controller;
include_once "wxBizDataCrypt.php";


class GetPhoneNumberController extends PublicController {
	 
	//***************************
	//  获取sessionkey 接口
	//***************************
	 public function getsessionkey(){
		   
		    $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=你的appid&secret=你的secret&grant_type=authorization_code';
                $dd = array();
                $dd['js_code']=$_REQUEST['code'];
                
                 /* curl_post()进行POST方式调用api： api.weixin.qq.com*/
                $result = $this->https_curl_json($url,$dd,'');
				 echo json_decode($result)->{"session_key"};
					 
                  exit();
    } 
   /* 发送json格式的数据，到api接口 -xzz0704  */
    function https_curl_json($url,$data,$type){
        if($type=='json'){//json $_POST=json_decode(file_get_contents('php://input'), TRUE);
            $headers = array("Content-type: application/json;charset=UTF-8","Accept: application/json","Cache-Control: no-cache", "Pragma: no-cache");
            
        }
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS,$data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers );
        $output = curl_exec($curl);
        if (curl_errno($curl)) {
            echo 'Errno'.curl_error($curl);//捕抓异常
        }
        curl_close($curl);
		 
        return $output;
        
	  }
	  
	  
	public function getphone(){
		$appid = '你的appid';
		$sessionKey =trim($_REQUEST['sessionkey']);
		$encryptedData=trim($_REQUEST['encryptedData']);
		$iv = trim($_REQUEST['iv']);
		$pc = new \wxBizDataCrypt($appid, $sessionKey);
		$errCode = $pc->decryptData($encryptedData, $iv, $data );
		if ($errCode == 0) {
			print($data . "\n");
		} else {
			print($errCode . "\n");
		}			 
	}
			  
}