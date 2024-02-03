<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "your@email.com";
    $subject = "File uploaded";
    $message = "A file has been uploaded.";

    $file = $_FILES["myfile"];

    if ($file["error"] == UPLOAD_ERR_OK) {
        $tmp_name = $file["tmp_name"];
        $name = basename($file["name"]);

        move_uploaded_file($tmp_name, "uploads/" . $name);

        $attachment = chunk_split(base64_encode(file_get_contents("uploads/" . $name)));
        $boundary = md5(time());

        $headers = "From: webmaster@example.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        $message .= "--$boundary\r\n";
        $message .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
        $message .= "Content-Transfer-Encoding: 7bit\r\n";
        $message .= "\r\n";
        $message .= "File attached.";

        $message .= "\r\n\r\n--$boundary\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"$name\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment\r\n";
        $message .= "\r\n";
        $message .= $attachment;
        $message .= "\r\n\r\n--$boundary--";

        mail($to, $subject, $message, $headers);

        echo "File uploaded successfully and email sent.";
    } else {
        echo "Error uploading file.";
    }
}
?>
