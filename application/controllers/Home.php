<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{

	public function __construct()
	{

		parent::__construct();

		$this->load->library('email');
	}


	public function index()
	{

		$this->load->view('index');
	}

	public function idioma()
	{

		if ($_POST['idioma'] == 'english') {

			$content = $this->load->view('home/home-ingles', null, true);
			echo $content;
		} elseif ($_POST['idioma'] == 'portugues') {

			$content = $this->load->view('home/home-pt-br', null, true);
			echo $content;
		}
	}

	public function contato()
	{


		$nome = htmlspecialchars($this->input->post('nome'));
		$email = htmlspecialchars($this->input->post('email'));
		$telefone = htmlspecialchars($this->input->post('telefone'));
		$mensagem = htmlspecialchars($this->input->post('mensagem'));

		$corpo = '
	
				<div style="border: 1px solid #999;width: 630px;padding: 20px;">
	
					<p style="font-family: Arial;">Você recebeu uma mensagem do formulário de contato do site <a href="https://site.com.br/" style="color: #333;">https://site.com.br</a></p>
					
					<div style="font-family: Arial;">
						
						<p><b>Nome:</b> ' . $nome . '</p>
						<p><b>E-mail:</b> ' . $email . '</p>
						<p><b>Telefone:</b> ' . $telefone . '</p>
						<p><b>Mensagem:</b> ' . $mensagem . '</p>
	
					</div>
	
				</div>
	
			';

			$config['smtp_host'] = 'smtp.site.com.br';
			$config['smtp_port'] = 587;
			$config['smtp_user'] = 'smtp@site.com.br';
			$config['smtp_pass'] = '';
			$config['protocol']  = 'smtp';
			$config['validate']  = TRUE;
			$config['mailtype']  = 'html';
			$config['charset']   = 'utf-8';
			$config['newline']   = "\r\n";
			
			// Desabilitar a validação do certificado SSL (apenas para teste, não recomendado em produção)
			$config['smtp_validate'] = FALSE;
			
			$this->email->initialize($config);
			$this->email->SMTPOptions = array(
				'ssl' => array(
					'verify_peer' => false,
					'verify_peer_name' => false,
					'allow_self_signed' => true
				 )
			 );

		$this->email->from('smtp@site.com.br', 'Site ');
		$this->email->reply_to($email);
		$this->email->to('contato@site.com.br');
		$this->email->subject('Contato - ');
		$this->email->message($corpo);
		$this->email->send();

		if ($this->email->send()) {
			echo "Email enviado com sucesso!";
		} else {
			echo "Erro ao enviar e-mail: " . $this->email->print_debugger();
		}
	}
}
