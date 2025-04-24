<div id="Teste">
    <form id="form_teste">
        <div class="templateform_geral_teste">
            <div class="row">
                <div class="col-12 col-s-12">
                    <div class="col-6 col-s-6">
                        <h2 data-traducao="8" class="color_white">Efetuar comentario</h2>
                    </div>
                    <div class="col-6 col-s-6">
                        <h2 data-traducao="8" class="color_white">teste para morrer</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-s-12">
                    <label><span class="aviso">*</span><b data-traducao="9"> Utilizador:</b></label>
                    <input type="email" name="utilizador" style="width:100%;" id="utilizador_id" minlength="30" maxlength="30" class="dados_elem_form_login" value="" pattern="[^@\s]+@[^@\s]+\.[^@\s]+" required>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-s-12">
                    <label><span class="aviso">*</span><b data-traducao="10"> Escrever comentario:</b></label>
                    <div style="display:flex; width:100%">
                        <div style="width:100%">
                            <input type="password" style="width:100%" name="password" autocomplete="on" id="password_id" maxlength="90" minlength="90" class="dados_elem_form_login" value="" required>
                        </div>
                        <div onclick="mostraresconderpassword('password_id');" style="margin-top: 11px; margin-left:-25px;">
                            <svg viewBox="0 0 30 30" style="
                                            fill: none;
                                            height: 30px;
                                            stroke: rgba(110, 12, 100, 0.9);
                                            stroke-linecap: round; 
                                            stroke-linejoin: round;
                                            stroke-width: 1;
                                            width: 30px;
                                        ">
                                <path d="M23.5,12c0,0-5.148,6.5-11.5,6.5S0.5,12,0.5,12S5.648,5.5,12,5.5S23.5,12,23.5,12z M12,8c2.209,0,4,1.791,4,4 s-1.791,4-4,4s-4-1.791-4-4S9.791,8,12,8z M12,10c1.105,0,2,0.895,2,2s-0.895,2-2,2s-2-0.895-2-2" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-s-12">
                    <p><span class="aviso">*&nbsp;</span> <b data-traducao="12">Campos obrigatórios</b> </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-s-12">
                    <span id="form_mensagem_login" class="form_inf_geral"></span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-s-12">
                    <div class="col-6 col-s-6">
                        <button type="submit" id="b_submit_id" class="botao_geral" onclick="login();return false;" data-traducao="13">Entrar</button>
                    </div>
                    <div class="col-6 col-s-6">
                        <button type="button" id="b_close_id" class="botao_geral" onclick="fechar_login()" data-traducao="14">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>