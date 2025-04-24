<?php

if (session_status() !== PHP_SESSION_NONE) {
    session_unset();
    session_destroy();
    session_start();
    $sid = session_id();
    $_SESSION["IDSESSION"] = $sid;
} else {

    session_start();
    $sid = session_id();
    $_SESSION["IDSESSION"] = $sid;
}
