<?php
include "Control/verificasessao_encaminha.php";
include "View/lib/geramenu.php";
include "Control/inicializa_conteudos_vistas.php";
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
    <script type="text/javascript" src="src/Vanilla/ariga_controla_conf_layout.js"></script>
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
                                    <button type="button" class="fundo_transparente sem_border cursor_ponteiro" onclick="close_login();"> <img id="sair" alt="Sair" width="20px" title="Sair" src="src/Images/door-closed.svg"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
        <div class="row">
            <div class="col-2 col-s-4">
                <div id="controla-icon-menu">
                    <button type="button" class="cursor_ponteiro style_bt_menu" onclick="MobileMenu()"> <img id="idseletormenu" alt="controla menu" title="Controla menu" width="30px" src="src/Images/menu-button.svg"></button>
                </div>
                <div>
                    <div id="templatemenu">
                        <div id="controla-icon-menubak" class="icon" style="position:relative; display:none; text-align:right;" onclick="MobileMenuback();">
                            <svg fill="#000000" height="30px" width="30px" viewBox="0 0 100 200">
                                <g>
                                    <g id="Double_Chevron_Left">
                                        <path d="M29.641,96.345l74.54-75.61c4.704-4.74,4.704-12.439,0-17.179c-4.704-4.74-12.319-4.74-17.011,0l-82.997,84.2
                                            c-4.511,4.559-4.535,12.608,0,17.191l83.009,84.2c4.692,4.74,12.319,4.74,17.011,0c4.704-4.74,4.704-12.439,0-17.179
                                            L29.641,96.345z" />
                                        <path d="M113.853,96.345l74.54-75.61c4.704-4.74,4.704-12.439,0-17.179c-4.704-4.74-12.319-4.74-17.011,0l-82.997,84.2
                                            c-4.511,4.559-4.535,12.608,0,17.191l82.997,84.2c4.704,4.74,12.319,4.74,17.011,0c4.704-4.74,4.704-12.439,0-17.179
                                            L113.853,96.345z" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div id="menu_a_medida_perfil"> <?php echo $i_html;
                                                        ?>




                        </div>

                    </div>
                </div>
            </div>
            <div class="col-10 col-s-8">
                <div id="manutencao_tabelas_sistemaid">
                    <?php include_once "View/manutencao_tabelas_sistema.php"
                    ?>
                </div>
                <div id="gestaoutilizadoresid">
                    <?php include_once "View/gestaoutilizadores.php"
                    ?>
                </div>
                <div id="gestaoperfilid">
                    <?php include_once "View/gestaoperfil.php"
                    ?>
                </div>
                <div id="gestaoautenticacaoid">
                    <?php include_once "View/gestaoautenticacao.php"
                    ?>
                </div>
                <div id="xmlimportarid">
                    <?php include_once "View/xmlimportar.php"
                    ?>
                </div>
                <div id="xmlexportarid">
                    <?php include_once "View/xmlexportar.php"
                    ?>
                </div>
                <div id="configuraid">
                    <?php include_once "View/configuraair.php"
                    ?>
                </div>
                <div id="visualizaid">
                    <?php include_once "View/visualizaair.php"
                    ?>
                </div>
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