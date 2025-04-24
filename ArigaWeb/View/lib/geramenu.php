<?php
include_once "Generic/constants.php";
include_once "View/lib/definemenu.php";

if (session_status() === PHP_SESSION_NONE) session_start();

$arrayitemsmenu = new definemenu();


$numero_menus = count($arrayitemsmenu->menuglobal);

$numero_perfis = 0;

if (isset($_SESSION['CODPERFIL'])) {
    $id_perfil = $_SESSION['CODPERFIL'];
} else {
    $id_perfil = constants::$perfil_UT1;
    //testes
    //$id_perfil = constants::$perfil_ADM;
}

$arraymenus_criar = array();
$indice_array = 1;
$total_menus = 0;
$existe_perfil = 0;

$i_html = "<ul id=\"ulmenu0\" class=\"ulmenu\" style=\"display: block;\">";

for ($i = 0; $i < $numero_menus; $i++) {
    $numero_perfis = count($arrayitemsmenu->menuglobal[$i]->perfil);
    $j = 0;
    $existe_perfil = 0;

    while ($j < $numero_perfis &&  $existe_perfil == 0) {

        if ($arrayitemsmenu->menuglobal[$i]->perfil[$j] == $id_perfil) {
            $arraymenus_criar[$indice_array] = $i;
            $indice_array = $indice_array + 1;
            $existe_perfil = 1;
        }
        $j = $j + 1;
    }
}

//Menu base - 0
$total_menus = count($arraymenus_criar);
for ($i = 1; $i <= $total_menus; $i++) {
    if ($arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->op == "N") {
        $i_html = $i_html . "<li id=\"limenu" . $i . "\" data-nacesso=\"-1\" class=\"limenu\" onclick=\"gestaomenu('limenu" . $i . "', 1, " . $total_menus . ", 'ulmenu" . $i . "');\">" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->nome . "</li>";
    } else {
        $i_html = $i_html . "<li id=\"limenu" . $i . "\" data-nacesso=\"" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->nacesso . "\" class=\"limenu\" onclick=\"gestaomenu('limenu" . $i . "', 1, " . $total_menus . ", '" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->pagina . "');\">" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->nome . "</li>";
    }
}
$i_html = $i_html . "</ul>";

$totalsub_menus = 0;
$indice_sub_menu = 0;
$indice_sub_menu_final = 0;
$indice_sub_menu_inicial = 0;

for ($i = 1; $i <= $total_menus; $i++) {
    $i_html = $i_html . "<ul id=\"ulmenu" . $i . "\" class=\"ulmenu\" style=\"display: none;\">";
    if ($arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->op == "N") {
        $totalsub_menus = count($arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->submenu[0]);
        $indice_sub_menu_final = ($i * 10) + $totalsub_menus;
        $indice_sub_menu_inicial = ($i * 10) + 1;
        for ($j = 0; $j < $totalsub_menus; $j++) {
            $indice_sub_menu = ($i * 10) + ($j + 1);
            $i_html = $i_html . "<li id=\"limenu" . $indice_sub_menu . "\" data-nacesso=\"" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->submenu[0][$j]['nacesso'] . "\" class=\"limenu\" onclick=\"gestaomenu('limenu" . $indice_sub_menu . "', " . $indice_sub_menu_inicial . ", " . $indice_sub_menu_final . ", '" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->submenu[0][$j]['pagina'] . "');\">" . $arrayitemsmenu->menuglobal[$arraymenus_criar[$i]]->submenu[0][$j]['nomeop'] . "</li>";
        }
        $totalsub_menus = 0;
    }
    $i_html = $i_html . "</ul>";
}    
/*
<!--<ul id="ulmenu0" class="ulmenu" style="display: block;">
<li id="limenu1" class="limenu" onclick="gestaomenu('limenu1', 1, 6, 'ulmenu1');">
GESTÃO DA FORMAÇÃO</li>
<li id="limenu2" class="limenu" onclick="gestaomenu('limenu2', 1, 6, 'ulmenu2');">FORMAÇÃO</li>
<li id="limenu3" class="limenu" onclick="gestaomenu('limenu3', 1, 6, 'ulmenu3');">TABELAS DA FORMAÇÃO</li>
<li id="limenu4" class="limenu" onclick="gestaomenu('limenu4', 1, 6, 'ulmenu4');">GESTÃO DO SISTEMA</li>
<li id="limenu5" class="limenu" onclick="gestaomenu('limenu5', 1, 6, 'ulmenu5');">MANUTENÇÃO</li>
<li id="limenu6" class="limenu" onclick="gestaomenu('limenu6', 1, 6, '');">ALTERAÇÃO DE PWS</li>
</ul>
<ul id="ulmenu1" class="ulmenu" style="display: none;">
<li id="limenu11" class="limenu" onclick="gestaomenu('limenu11', 11, 18, '');">CRIA FORMAÇÃO</li>
<li id="limenu12" class="limenu" onclick="gestaomenu('limenu12', 11, 18, '');">PESQUISA FORMAÇÃO</li>
<li id="limenu13" class="limenu" onclick="gestaomenu('limenu13', 11, 18, '');">CRIA ENTIDADE</li>
<li id="limenu14" class="limenu" onclick="gestaomenu('limenu14', 11, 18, '');">ASSOCIA FORMADOR</li>
<li id="limenu15" class="limenu" onclick="gestaomenu('limenu15', 11, 18, '');">PESQUISA ENTIDADE</li>
<li id="limenu16" class="limenu" onclick="gestaomenu('limenu16', 11, 18, '');">CRIA FORMADOR</li>
<li id="limenu17" class="limenu" onclick="gestaomenu('limenu17', 11, 18, '');">PESQUISA FORMADOR</li>
<li id="limenu18" class="limenu" onclick="gestaomenu('limenu18', 11, 18, '');">PESQUISA INSCRIÇÃO</li>
</ul>
<ul id="ulmenu2" class="ulmenu" style="display: none;">
<li id="limenu21" class="limenu" onclick="gestaomenu('limenu21', 21, 22, '');">PESQUISA FORMAÇÃO</li>
<li id="limenu22" class="limenu" onclick="gestaomenu('limenu22', 21, 22, '');">PESQUISA INSCRIÇÃO</li>
</ul>
<ul id="ulmenu3" class="ulmenu" style="display: none;">
<li id="limenu31" class="limenu" onclick="gestaomenu('limenu31', 31, 34, '');">TIPO FORMAÇÃO</li>
<li id="limenu32" class="limenu" onclick="gestaomenu('limenu32', 31, 34, '');">ÂMBITO DA FORMAÇÃO</li>
<li id="limenu33" class="limenu" onclick="gestaomenu('limenu33', 31, 34, '');">ÁREA DA FORMAÇÃO</li>
<li id="limenu34" class="limenu" onclick="gestaomenu('limenu34', 31, 34, '');">HABILITAÇÃO</li>
</ul>
<ul id="ulmenu4" class="ulmenu" style="display: none;">
<li id="limenu41" class="limenu" onclick="gestaomenu('limenu41', 41, 45, '');">AUDITORIA</li>
<li id="limenu42" class="limenu" onclick="gestaomenu('limenu42', 41, 45, '');">SESSÃO</li>
<li id="limenu43" class="limenu" onclick="gestaomenu('limenu43', 41, 45, '');">PERFIL</li>
<li id="limenu44" class="limenu" onclick="gestaomenu('limenu44', 41, 45, '');">UTILIZADORES</li>
<li id="limenu45" class="limenu" onclick="gestaomenu('limenu45', 41, 45, '');">AUTENTICAÇÃO</li>
</ul>
<ul id="ulmenu5" class="ulmenu" style="display: none;">
<li id="limenu51" class="limenu" onclick="gestaomenu('limenu51', 51, 52, '');">PERFIS</li>
<li id="limenu52" class="limenu" onclick="gestaomenu('limenu52', 51, 52, '');">CATEGORIA</li>
</ul>-->
*/
