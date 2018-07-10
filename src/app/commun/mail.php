<?php
echo $_POST;
/*
// Récupération des variables postées
extract($_POST);

// Mail du destinataire du message
$mailEnvoi = "jmoutier@gmail.com";

// Gestion du retour à la ligne
if (!preg_match("#^[a-z0-9._-]+@(hotmail|live|msn).[a-z]{2,4}$#", $mailEnvoi)) 
    // On filtre les serveurs qui rencontrent des bogues.
{
	$passage_ligne = "\r\n";
}
else
{
	$passage_ligne = "\n";
}


 création de l'entête
$header = "From: \"Test envoi mail ANGULAR\" <sarlsfdb.start.ovh.net>".$passage_ligne;
$header.= "Reply-to: \"".$nom."\" <".$mail.">".$passage_ligne;
$header.= "MIME-Version: 1.0".$passage_ligne;
$header.= "Content-Type: text/plain".$passage_ligne;

// création du message
$finalMessage = "Message de: ".$nom.$passage_ligne;
$finalMessage.= "Adresse de messagerie: ".$mail.$passage_ligne;
$finalMessage.= $passage_ligne.$message;

//=====Envoi de l'e-mail.
 echo mail($mailEnvoi,$sujet,$finalMessage,$header);
//==========
*/
?>