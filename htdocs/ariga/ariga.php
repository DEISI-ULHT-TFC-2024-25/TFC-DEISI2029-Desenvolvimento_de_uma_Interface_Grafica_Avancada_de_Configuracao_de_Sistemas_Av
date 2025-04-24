<?php
include "Control/controla_inicio_sessao.php";
?>

<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=yes, minimum-scale=0.25, maximum-scale=5.0, width=device-width" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta http-equiv="Cache-Control" content="no-cache">
    <link rel="icon" type="image/x-icon" href="src\Images\air_icon-icons.com_72030.ico">
    <meta name="Descrição" content="Sistema ARIGA">
    <title>Sistema ARIGA</title>
    <link href="src/Style/ariga.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="src/Vanilla/arigacom.js"></script>
    <script type="text/javascript" src="src/Vanilla/arigaconst.js"></script>
    <script type="text/javascript" src="src/Vanilla/ariga.js"></script>
    <script type="text/javascript" src="src/Vanilla/ariga_control_gen.js"></script>
    <meta property="og:title" content="Sistema ARIGA" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="/app/app.php" />
    <meta property="og:description" content="Sistema ARIGA" />
    <meta property="og:locale" content="pt_PT" />

</head>

<body>
    <div class="bg">
        <div class="row">
            <div class="col-12 col-s-12">
                <header>
                    <div id="tituloid" class="row">
                        <div class="col-3 col-s-3" id="logoid">
                            <img alt="" class="logo" id="logoimg">AIR</img>
                        </div>
                        <div class="col-6 col-s-9">
                            <div class="titulostyle">
                                <span class="titulo" data-traducao="3">Sistema ARIGA</span>
                            </div>
                        </div>
                        <div class="col-3 col-s-12">
                            <div class="row">
                                <div class="col-12 col-s-12 alinhamento_texto_direita" style="margin-top:12px;">
                                    <button type="button" class="fundo_transparente sem_border cursor_ponteiro" onclick="mostrar_login();"> <img id="identrar" alt="Entrar" width="20px" title="Entrar" src="src/Images/door-open.svg"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
        <div class="row">
            <div class="col-3 col-s-3">
                <p class="largura_100p"></p>
            </div>
            <div class="col-6 col-s-9">
                <?php //include_once "Control/envia_xml_DB.php"
                ?>
                <div id="login_id">
                    <?php include_once "View/login.php"
                    ?>
                </div>
            </div>
            <div class="col-3 col-s-12">
                <p class="largura_100p"></p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-s-12">
                <p><br><br></p>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-s-12 fixed_footer footer">
                <div class="col-3 col-s-3">
                    <div class="row">
                        <div class="col-12 col-s-12 alinhamento_texto_esquerda">
                            <p class="largura_100p"></p>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-s-6">
                    <p id="envioemail" class="margem_padding_0" data-traducao="4">Para usar a AIR, envie um email para <b>rica@ariga.com</p>
                </div>
                <div class="col-3 col-s-3">
                    <div class="row">
                        <div class="col-11 col-s-11 " id="direitosautor">
                            <div class="alinhamento_texto_direita">
                                <a href="https://lavbella.com" target="_blank" class="link_a" data-traducao="7">©2025 AllHaillHati</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>