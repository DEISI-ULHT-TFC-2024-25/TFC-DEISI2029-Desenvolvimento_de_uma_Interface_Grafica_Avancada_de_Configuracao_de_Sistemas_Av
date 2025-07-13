--
-- PostgreSQL database dump
--

-- Dumped from database version 10.23
-- Dumped by pg_dump version 10.23

-- Started on 2025-07-13 22:03:57

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3114 (class 0 OID 0)
-- Dependencies: 3113
-- Name: DATABASE "Ariga"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE "Ariga" IS 'vai conter as tabelas importantes';


--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3116 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 258 (class 1255 OID 17495)
-- Name: altera_airconfiguration(bigint, integer, integer, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_airconfiguration(_id bigint, _requiredcores integer, _tickspersecond integer, _idarinc653module bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0; 
 
BEGIN 
 
	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.airconfiguration SET
	requiredcores = COALESCE(NULLIF(_requiredcores, 0), requiredcores),
  	tickspersecond = COALESCE(NULLIF(_tickspersecond, 0), tickspersecond),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.airconfiguration.id =_id and public.airconfiguration.idarinc653module = _idarinc653module
	RETURNING airconfiguration.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'airconfiguration alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'airconfiguration: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar airconfiguration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar airconfiguration: ' || r_value::TEXT || ' (tabela airconfiguration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_airconfiguration(_id bigint, _requiredcores integer, _tickspersecond integer, _idarinc653module bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 259 (class 1255 OID 17496)
-- Name: altera_arinc653module(bigint, character varying, character varying, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_arinc653module(_id bigint, _modulename character varying, _xmlnsxsi character varying, _idconfiguration bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0;  
r_valueaudite BIGINT := 0;
 
BEGIN  

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.arinc653module SET
  	modulename = COALESCE(NULLIF(_modulename, ''), modulename),
	xmlnsxsi = COALESCE(NULLIF(_xmlnsxsi, ''), xmlnsxsi),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.arinc653module.id =_id and public.arinc653module.idconfiguration = _idconfiguration
	RETURNING arinc653module.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'arinc653module alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'arinc653module: ' || _modulename ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar arinc653module!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar arinc653module: ' || _modulename || ' (tabela arinc653module)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_arinc653module(_id bigint, _modulename character varying, _xmlnsxsi character varying, _idconfiguration bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 260 (class 1255 OID 17497)
-- Name: altera_configuration(bigint, character varying, character varying, integer, integer, character varying, character varying, character varying, character varying, integer, integer, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_configuration(_id bigint, _archname character varying, _bare character varying, _iddebugmonitor integer, _idfpu integer, _installrtos character varying, _posixrtems5 character varying, _rtems48i character varying, _rtems5 character varying, _idtargetboard integer, _idarchitecturetype integer, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 
 
	oresultado := 0;
	oresultadodesc := '';

	UPDATE public.configuration SET
  	archname = COALESCE(NULLIF(_archname, ''), archname),
	bare = COALESCE(NULLIF(_bare, '')::boolean, bare),
	iddebugmonitor = COALESCE(NULLIF(_iddebugmonitor, 0), iddebugmonitor),
	idfpu = COALESCE(NULLIF(_idfpu, 0), idfpu),
	installrtos = COALESCE(NULLIF(_installrtos, '')::boolean, installrtos),
	posixrtems5 = COALESCE(NULLIF(_posixrtems5, '')::boolean, posixrtems5),
	rtems48i = COALESCE(NULLIF(_rtems48i, '')::boolean, rtems48i),
	rtems5 = COALESCE(NULLIF(_rtems5, '')::boolean, rtems5),
	idtargetboard = COALESCE(NULLIF(_idtargetboard, 0), idtargetboard),
	idarchitecturetype = COALESCE(NULLIF(_idarchitecturetype, 0), idarchitecturetype),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE id =_id
	RETURNING configuration.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'configuration alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'configuration: ' || _archname ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar configuration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar configuration: ' || _archname || ' (tabela configuration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_configuration(_id bigint, _archname character varying, _bare character varying, _iddebugmonitor integer, _idfpu integer, _installrtos character varying, _posixrtems5 character varying, _rtems48i character varying, _rtems5 character varying, _idtargetboard integer, _idarchitecturetype integer, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 261 (class 1255 OID 17498)
-- Name: altera_memory(bigint, character varying, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_memory(_id bigint, _size character varying, _idpartitionconfiguration bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.memory SET
  	size = COALESCE(NULLIF(_size, ''), size),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.memory.id =_id and public.memory.idpartitionconfiguration = _idpartitionconfiguration
	RETURNING public.memory.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'memory alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'memory: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar memory!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar memory: ' || r_value::TEXT || ' (tabela memory)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_memory(_id bigint, _size character varying, _idpartitionconfiguration bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 262 (class 1255 OID 17499)
-- Name: altera_moduleschedule(bigint, character varying, numeric, integer, character varying, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_moduleschedule(_id bigint, _initialmoduleschedule character varying, _majorframeseconds numeric, _scheduleidentifier integer, _schedulename character varying, _idarinc653module bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0; 
  
BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.moduleschedule SET
  	initialmoduleschedule = COALESCE(NULLIF(_initialmoduleschedule, '')::boolean, initialmoduleschedule),
	majorframeseconds = COALESCE(NULLIF(_majorframeseconds, 0), majorframeseconds),
	scheduleidentifier = COALESCE(NULLIF(_scheduleidentifier, 0), scheduleidentifier),
	schedulename = COALESCE(NULLIF(_schedulename, ''), schedulename),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.moduleschedule.id =_id and public.moduleschedule.idarinc653module = _idarinc653module
	RETURNING public.moduleschedule.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'moduleschedule alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'moduleschedule: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar moduleschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar moduleschedule: ' || r_value::TEXT || ' (tabela moduleschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_moduleschedule(_id bigint, _initialmoduleschedule character varying, _majorframeseconds numeric, _scheduleidentifier integer, _schedulename character varying, _idarinc653module bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 263 (class 1255 OID 17500)
-- Name: altera_partitionconfiguration(bigint, text, integer, text, text, text, text, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_partitionconfiguration(_id bigint, _cache text, _cores integer, _libs text, _personality text, _devices text, _permissions text, _idpartition bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
  
BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.partitionconfiguration SET
  	cache = COALESCE(NULLIF(_cache, ''), cache),
	cores = COALESCE(NULLIF(_cores, 0), cores),
	libs = COALESCE(NULLIF(_libs, ''), libs),
	personality = COALESCE(NULLIF(_personality, ''), personality),
	devices = COALESCE(NULLIF(_devices, ''), devices),
	permissions = COALESCE(NULLIF(_permissions, ''), permissions),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.partitionconfiguration.id =_id and public.partitionconfiguration.idpartition = _idpartition
	RETURNING public.partitionconfiguration.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'partitionconfiguration alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitionconfiguration: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar partitionconfiguration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar partitionconfiguration: ' || r_value::TEXT || ' (tabela partitionconfiguration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_partitionconfiguration(_id bigint, _cache text, _cores integer, _libs text, _personality text, _devices text, _permissions text, _idpartition bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 264 (class 1255 OID 17501)
-- Name: altera_partitions(bigint, integer, character varying, integer, character varying, text, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_partitions(_id bigint, _criticality integer, _partitionname character varying, _partitionidentifier integer, _systempartition character varying, _entrypoint text, _idarinc653module bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN  

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.partitions SET
  	criticality = COALESCE(NULLIF(_criticality, 0), criticality),
	partitionname = COALESCE(NULLIF(_partitionname, ''), partitionname),
	partitionidentifier = COALESCE(NULLIF(_partitionidentifier, 0), partitionidentifier),
	systempartition = COALESCE(NULLIF(_systempartition, '')::boolean, systempartition),
	entrypoint = COALESCE(NULLIF(_entrypoint, ''), entrypoint),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.partitions.id =_id and public.partitions.idarinc653module = _idarinc653module
	RETURNING public.partitions.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'partitions alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitions: ' || _partitionname ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar partitions!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar partitions: ' || _partitionname || ' (tabela partitions)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_partitions(_id bigint, _criticality integer, _partitionname character varying, _partitionidentifier integer, _systempartition character varying, _entrypoint text, _idarinc653module bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 265 (class 1255 OID 17502)
-- Name: altera_partitionschedule(bigint, numeric, numeric, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_partitionschedule(_id bigint, _perioddurationseconds numeric, _periodseconds numeric, _idmoduloschedule bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0; 
 
BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.partitionschedule SET
  	perioddurationseconds = COALESCE(NULLIF(_perioddurationseconds, 0), perioddurationseconds),
	periodseconds = COALESCE(NULLIF(_periodseconds, 0), periodseconds),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.partitionschedule.id =_id and public.partitionschedule.idmoduloschedule = _idmoduloschedule
	RETURNING public.partitionschedule.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'partitionschedule alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitionschedule: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar partitionschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar partitionschedule: ' || r_value::TEXT || ' (tabela partitionschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_partitionschedule(_id bigint, _perioddurationseconds numeric, _periodseconds numeric, _idmoduloschedule bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 266 (class 1255 OID 17503)
-- Name: altera_windowconfiguration(bigint, integer, integer, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_windowconfiguration(_id bigint, _windowidentifier integer, _cores integer, _idpartitionschedule bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0; 
 
BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.windowconfiguration SET 
  	windowidentifier = COALESCE(NULLIF(_windowidentifier, 0), windowidentifier),
	cores = COALESCE(NULLIF(_cores, 0), cores),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.windowconfiguration.id =_id and public.windowconfiguration.idpartitionschedule = _idpartitionschedule
	RETURNING public.windowconfiguration.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'windowconfiguration alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'windowconfiguration: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar windowconfiguration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar windowconfiguration: ' || r_value::TEXT || ' (tabela windowconfiguration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_windowconfiguration(_id bigint, _windowidentifier integer, _cores integer, _idpartitionschedule bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 280 (class 1255 OID 17504)
-- Name: altera_windowschedule(bigint, character varying, numeric, integer, numeric, integer, bigint, bigint, character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.altera_windowschedule(_id bigint, _partitionperiodstart character varying, _windowdurationseconds numeric, _windowidentifier integer, _windowstartseconds numeric, _coreidentifier integer, _idpartitionschedule bigint, _idpartitionconfiguration bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0; 
 
BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	UPDATE public.windowschedule SET
  	partitionperiodstart = COALESCE(NULLIF(_partitionperiodstart, '')::boolean, partitionperiodstart),
	windowdurationseconds = COALESCE(NULLIF(_windowdurationseconds, 0), windowdurationseconds),
	windowidentifier = COALESCE(NULLIF(_windowidentifier, 0), windowidentifier),
	windowstartseconds = COALESCE(NULLIF(_windowstartseconds, -1), windowstartseconds),
	coreidentifier = COALESCE(NULLIF(_coreidentifier, 0), coreidentifier),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	idpartitionconfiguration = COALESCE(NULLIF(_idpartitionconfiguration, 0), idpartitionconfiguration),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE public.windowschedule.id =_id and public.windowschedule.idpartitionschedule = _idpartitionschedule
	RETURNING public.windowschedule.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'windowschedule alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'windowschedule: ' || r_value::TEXT ||' alterada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar windowschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar windowschedule: ' || r_value::TEXT || ' (tabela windowschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.altera_windowschedule(_id bigint, _partitionperiodstart character varying, _windowdurationseconds numeric, _windowidentifier integer, _windowstartseconds numeric, _coreidentifier integer, _idpartitionschedule bigint, _idpartitionconfiguration bigint, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 249 (class 1255 OID 17444)
-- Name: alteraperfilutilizador(bigint, bigint, integer); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.alteraperfilutilizador(_idutilizador bigint, _idautenticacao bigint, _idperfilutilizador integer, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;

BEGIN 

	oresultado := 0; 
	oresultadodesc := '';

	UPDATE public.utilizador SET
	idperfilutilizador = _idperfilutilizador,
	dataalteracao = now(),
	horaalteracao = now()
	WHERE id =_idutilizador
	RETURNING utilizador.id INTO r_value;
	
	IF ( r_value > 0 and not r_value isnull) THEN 

		oresultado := 1;
		oresultadodesc := 'Perfil de utilizador alterado com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'perfil de utilizador: ' || _idutilizador::TEXT ||' alterarada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;
	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar a perfil de utilizador!...';
		
		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacaoexec,  'Erro a alterar o perfil de utilizador: ' || _idutilizador::TEXT || ' (tabela utilizador)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.alteraperfilutilizador(_idutilizador bigint, _idautenticacao bigint, _idperfilutilizador integer, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 246 (class 1255 OID 17445)
-- Name: alterautenticacao(bigint, bigint, character varying); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.alterautenticacao(_idautenticacao bigint, _idautenticacaoexec bigint, _activo character varying, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0; 

BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	UPDATE public.autenticacao SET
	activo = _activo,
	dataalteracao = now(),
	horaalteracao = now()
	WHERE id =_idautenticacao
	RETURNING autenticacao.id INTO r_value;
	
	IF ( r_value > 0 and not r_value isnull) THEN 

		oresultado := 1;
		oresultadodesc := 'Autenticação alterado com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacaoexec,  'Autenticação: ' || _idautenticacao::TEXT ||' alterarada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;
	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar a autenticação!...';
		
		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacaoexec,  'Erro a alterar a autenticação: ' || _idautenticacao::TEXT || ' (tabela autenticacao)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.alterautenticacao(_idautenticacao bigint, _idautenticacaoexec bigint, _activo character varying, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 250 (class 1255 OID 17446)
-- Name: alterautilizador_com_pws(bigint, character varying, character varying, character varying, integer, character varying, integer, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.alterautilizador_com_pws(_idutilizador bigint, _nome character varying, _email character varying, _activo character varying, _idperfilutilizador integer, _pws character varying, _so_pws integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 
r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
r_valueidautenticacao BIGINT :=0;
r_valueidautenticacao_in BIGINT :=0;

BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	UPDATE public.utilizador SET
  	nome = COALESCE(NULLIF(_nome, ''), nome),
	email = COALESCE(NULLIF(_email, ''), email),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	idperfilutilizador = COALESCE(NULLIF(_idperfilutilizador, 0), idperfilutilizador),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE id =_idutilizador
	RETURNING utilizador.id INTO r_value;
	
	r_valueidautenticacao_in := (select * from obtem_idautenticacao_idutilizador(_idutilizador));
	
	IF (_so_pws = 0) THEN
		IF ( r_value > 0 and not r_value isnull) THEN 
			IF (_pws <> '' and r_valueidautenticacao_in > 0) THEN

				UPDATE autenticacao
				SET pws = _pws, dataalteracao = now(), horaalteracao = now()
				WHERE id = r_valueidautenticacao_in
				RETURNING autenticacao.id INTO r_valueidautenticacao; 

				IF ( r_valueidautenticacao > 0 and not r_valueidautenticacao isnull) THEN 

					oresultado := 1;
					oresultadodesc := 'Utilizador alterado com sucesso!...';

					INSERT INTO auditoria (idautenticacao, descricao)
					VALUES (_idautenticacao,  'Utilizador: ' || _idutilizador::TEXT ||' alterarado com sucesso!...'::TEXT)
					RETURNING auditoria.id INTO r_valueaudite;
				ELSE
					ROLLBACK;
					oresultado := -1;
					oresultadodesc := 'Erro a alterar o utilizador!....';

					INSERT INTO auditoria (idautenticacao, descricao)
					VALUES (_idautenticacao,  'Erro a alterar o utilizador: ' || _idutilizador::TEXT || ' (tabela autenticacao)'::TEXT) 
					RETURNING auditoria.id INTO r_valueaudite;
				END IF;
			ELSE

				oresultado := 1;
				oresultadodesc := 'Utilizador alterado com sucesso!...';

				INSERT INTO auditoria (idautenticacao, descricao)
				VALUES (_idautenticacao,  'Utilizador: ' || _idutilizador::TEXT ||' alterarado com sucesso!...'::TEXT)
				RETURNING auditoria.id INTO r_valueaudite;
			END IF;
		ELSE
			ROLLBACK;
			oresultado := -1;
			oresultadodesc := 'Erro a alterar o utilizador!...';

			INSERT INTO auditoria (idautenticacao, descricao)
			VALUES (_idautenticacao,  'Erro a alterar o utilizador: ' || _idutilizador::TEXT || ' (tabela utilizador)'::TEXT) 
			RETURNING auditoria.id INTO r_valueaudite;
		END IF;
	ELSE
		IF (_pws <> '' and r_valueidautenticacao_in > 0) THEN
		
			UPDATE autenticacao
			SET pws = _pws, dataalteracao = now(), horaalteracao = now()
			WHERE id = r_valueidautenticacao_in
			RETURNING autenticacao.id INTO r_valueidautenticacao; 

			IF ( r_valueidautenticacao > 0 and not r_valueidautenticacao isnull) THEN 

				oresultado := 1;
				oresultadodesc := 'Password alterada com sucesso!...';

				INSERT INTO auditoria (idautenticacao, descricao)
				VALUES (_idautenticacao,  'Utilizador: ' || _idutilizador::TEXT ||' alterarado com sucesso!...'::TEXT)
				RETURNING auditoria.id INTO r_valueaudite;
			ELSE
				ROLLBACK;
				oresultado := -1;
				oresultadodesc := 'Erro a alterar a password!....';

				INSERT INTO auditoria (idautenticacao, descricao)
				VALUES (_idautenticacao,  'Erro a alterar o utilizador: ' || _idutilizador::TEXT || ' (tabela autenticacao)'::TEXT) 
				RETURNING auditoria.id INTO r_valueaudite;
			END IF;
		ELSE
			ROLLBACK;
			oresultado := -1;
			oresultadodesc := 'Erro a alterar o utilizador!....';

			INSERT INTO auditoria (idautenticacao, descricao)
			VALUES (_idautenticacao,  'Erro a alterar o utilizador: ' || _idutilizador::TEXT || ' (tabela autenticacao)'::TEXT) 
			RETURNING auditoria.id INTO r_valueaudite;
		END IF;
	END IF;
END;
$$;


ALTER FUNCTION public.alterautilizador_com_pws(_idutilizador bigint, _nome character varying, _email character varying, _activo character varying, _idperfilutilizador integer, _pws character varying, _so_pws integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 268 (class 1255 OID 17507)
-- Name: cria_airconfiguration(integer, integer, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_airconfiguration(_requiredcores integer, _tickspersecond integer, _idarinc653module bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
  
BEGIN 

	oresultado := 0; 
	oresultadodesc := '';

	INSERT INTO public.airconfiguration(requiredcores, tickspersecond, idarinc653module) 
	VALUES (_requiredcores, _tickspersecond, _idarinc653module)
	RETURNING public.airconfiguration.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'airconfiguration criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'airconfiguration: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar airconfiguration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar airconfiguration: ' || r_value::TEXT || ' (tabela airconfiguration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_airconfiguration(_requiredcores integer, _tickspersecond integer, _idarinc653module bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 269 (class 1255 OID 17508)
-- Name: cria_arinc653module(character varying, character varying, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_arinc653module(_modulename character varying, _xmlnsxsi character varying, _idconfiguration bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 
 
	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.arinc653module(modulename, xmlnsxsi, idconfiguration) 
	VALUES (_modulename, _xmlnsxsi, _idconfiguration)
	RETURNING arinc653module.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'arinc653module criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'arinc653module: ' || _modulename ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar arinc653module!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar arinc653module: ' || _modulename || ' (tabela arinc653module)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_arinc653module(_modulename character varying, _xmlnsxsi character varying, _idconfiguration bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 270 (class 1255 OID 17509)
-- Name: cria_configuration(character varying, character varying, integer, integer, character varying, character varying, character varying, character varying, integer, integer, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_configuration(_archname character varying, _bare character varying, _iddebugmonitor integer, _idfpu integer, _installrtos character varying, _posixrtems5 character varying, _rtems48i character varying, _rtems5 character varying, _idtargetboard integer, _idarchitecturetype integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.configuration(archname, bare, iddebugmonitor, idfpu, installrtos, posixrtems5, rtems48i, rtems5, idtargetboard, idarchitecturetype) 
	VALUES (_archname, _bare::boolean, _iddebugmonitor, _idfpu, _installrtos::boolean, _posixrtems5::boolean, _rtems48i::boolean, _rtems5::boolean, _idtargetboard, _idarchitecturetype)
	RETURNING configuration.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'configuration criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'configuration: ' || _archname ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar configuration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar configuration: ' || _archname || ' (tabela configuration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_configuration(_archname character varying, _bare character varying, _iddebugmonitor integer, _idfpu integer, _installrtos character varying, _posixrtems5 character varying, _rtems48i character varying, _rtems5 character varying, _idtargetboard integer, _idarchitecturetype integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 271 (class 1255 OID 17510)
-- Name: cria_memory(character varying, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_memory(_size character varying, _idpartitionconfiguration bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
 
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.memory(size, idpartitionconfiguration) 
	VALUES (_size, _idpartitionconfiguration)
	RETURNING public.memory.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'memory criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'memory: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar memory!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar memory: ' || r_value::TEXT || ' (tabela memory)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_memory(_size character varying, _idpartitionconfiguration bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 272 (class 1255 OID 17511)
-- Name: cria_moduleschedule(character varying, numeric, integer, character varying, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_moduleschedule(_initialmoduleschedule character varying, _majorframeseconds numeric, _scheduleidentifier integer, _schedulename character varying, _idarinc653module bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 
 
	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.moduleschedule(initialmoduleschedule, majorframeseconds, scheduleidentifier, schedulename, idarinc653module) 
	VALUES (_initialmoduleschedule::boolean, _majorframeseconds, _scheduleidentifier, _schedulename, _idarinc653module)
	RETURNING public.moduleschedule.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'moduleschedule criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'moduleschedule: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar moduleschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar moduleschedule: ' || r_value::TEXT || ' (tabela moduleschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_moduleschedule(_initialmoduleschedule character varying, _majorframeseconds numeric, _scheduleidentifier integer, _schedulename character varying, _idarinc653module bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 273 (class 1255 OID 17512)
-- Name: cria_partitionconfiguration(text, integer, text, text, text, text, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_partitionconfiguration(_cache text, _cores integer, _libs text, _personality text, _devices text, _permissions text, _idpartition bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.partitionconfiguration(cache, cores, libs, personality, devices, permissions, idpartition) 
	VALUES (_cache, _cores, _libs, _personality, _devices, _permissions, _idpartition)
	RETURNING public.partitionconfiguration.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'partitionconfiguration criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitionconfiguration: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar partitionconfiguration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar partitionconfiguration: ' || r_value::TEXT || ' (tabela partitionconfiguration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_partitionconfiguration(_cache text, _cores integer, _libs text, _personality text, _devices text, _permissions text, _idpartition bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 274 (class 1255 OID 17513)
-- Name: cria_partitions(integer, character varying, integer, character varying, text, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_partitions(_criticality integer, _partitionname character varying, _partitionidentifier integer, _systempartition character varying, _entrypoint text, _idarinc653module bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.partitions(criticality, partitionname, partitionidentifier, systempartition, entrypoint, idarinc653module) 
	VALUES (_criticality, _partitionname, _partitionidentifier, _systempartition::boolean, _entrypoint, _idarinc653module)
	RETURNING public.partitions.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'partitions criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitions: ' || _partitionname::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar partitions!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar partitions: ' || _partitionname::TEXT || ' (tabela partitions)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_partitions(_criticality integer, _partitionname character varying, _partitionidentifier integer, _systempartition character varying, _entrypoint text, _idarinc653module bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 275 (class 1255 OID 17514)
-- Name: cria_partitionschedule(numeric, numeric, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_partitionschedule(_perioddurationseconds numeric, _periodseconds numeric, _idmoduloschedule bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.partitionschedule(perioddurationseconds, periodseconds, idmoduloschedule) 
	VALUES (_perioddurationseconds, _periodseconds, _idmoduloschedule)
	RETURNING public.partitionschedule.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'partitionschedule criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitionschedule: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar partitionschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar partitionschedule: ' || r_value::TEXT || ' (tabela partitionschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_partitionschedule(_perioddurationseconds numeric, _periodseconds numeric, _idmoduloschedule bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 276 (class 1255 OID 17515)
-- Name: cria_windowconfiguration(integer, integer, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_windowconfiguration(_windowidentifier integer, _cores integer, _idpartitionschedule bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0;  
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.windowconfiguration(windowidentifier, cores, idpartitionschedule) 
	VALUES (_windowidentifier, _cores, _idpartitionschedule)
	RETURNING public.windowconfiguration.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'windowconfiguration criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'windowconfiguration: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar windowconfiguration!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar windowconfiguration: ' || r_value::TEXT || ' (tabela windowconfiguration)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_windowconfiguration(_windowidentifier integer, _cores integer, _idpartitionschedule bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 277 (class 1255 OID 17516)
-- Name: cria_windowschedule(character varying, numeric, integer, numeric, integer, bigint, bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.cria_windowschedule(_partitionperiodstart character varying, _windowdurationseconds numeric, _windowidentifier integer, _windowstartseconds numeric, _coreidentifier integer, _idpartitionschedule bigint, _idpartitionconfiguration bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.windowschedule(partitionperiodstart, windowdurationseconds, windowidentifier, windowstartseconds, coreidentifier, idpartitionschedule, idpartitionconfiguration) 
	VALUES (_partitionperiodstart::boolean, _windowdurationseconds, _windowidentifier, _windowstartseconds, _coreidentifier, _idpartitionschedule, _idpartitionconfiguration)
	RETURNING public.windowschedule.id INTO r_value; 

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := r_value;
		oresultadodesc := 'windowschedule criada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'windowschedule: ' || r_value::TEXT ||' criado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar windowschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar windowschedule: ' || r_value::TEXT || ' (tabela windowschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.cria_windowschedule(_partitionperiodstart character varying, _windowdurationseconds numeric, _windowidentifier integer, _windowstartseconds numeric, _coreidentifier integer, _idpartitionschedule bigint, _idpartitionconfiguration bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 281 (class 1255 OID 17524)
-- Name: delete_partitions(bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.delete_partitions(_id bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value integer := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN  
 
	oresultado := 0;
	oresultadodesc := ''; 

	DELETE FROM partitions where id = _id RETURNING id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := 1;
		oresultadodesc := 'partitions apagada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitions: ' || _id::TEXT ||' apagada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		oresultado := 0;
		oresultadodesc := 'Não foi possível apagar a partitions!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Não foi possível apagar a partitions: ' || _id::TEXT || ' (tabela partitions)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.delete_partitions(_id bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 282 (class 1255 OID 17525)
-- Name: delete_partitionschedule(bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.delete_partitionschedule(_id bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value integer := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN   

	oresultado := 0;
	oresultadodesc := '';  

	DELETE FROM partitionschedule where id = _id RETURNING id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := 1;
		oresultadodesc := 'partitionschedule apagada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'partitionschedule: ' || _id::TEXT ||' apagada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		oresultado := 0;
		oresultadodesc := 'Não foi possível apagar a partitionschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Não foi possível apagar a partitionschedule: ' || _id::TEXT || ' (tabela partitionschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.delete_partitionschedule(_id bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 283 (class 1255 OID 17526)
-- Name: delete_windowschedule(bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.delete_windowschedule(_id bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value integer := 0; 
r_valueaudite BIGINT := 0;
  
BEGIN   

	oresultado := 0;
	oresultadodesc := '';  

	DELETE FROM windowschedule where id = _id RETURNING id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN

		oresultado := 1;
		oresultadodesc := 'windowschedule apagada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'windowschedule: ' || _id::TEXT ||' apagada com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;

	ELSE
		oresultado := 0;
		oresultadodesc := 'Não foi possível apagar a windowschedule!...';	

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Não foi possível apagar a windowschedule: ' || _id::TEXT || ' (tabela windowschedule)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.delete_windowschedule(_id bigint, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 257 (class 1255 OID 17494)
-- Name: geraxml(bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.geraxml(_idconfiguration bigint, _idautenticacao bigint, OUT oxml text, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value_arinc653module BIGINT := 0; 
r_valuetext TEXT := '';

BEGIN  

	oresultado := 0;
	oresultadodesc := '';
	
	r_valuetext := '<?xml version="1.0" standalone="yes"?><!DOCTYPE xml>';
	
	r_valuetext := r_valuetext || (select '<configuration id="' || id::TEXT || '">' 
	|| '<archname>' || archname::TEXT || '</archname>'  
    || '<bare>' || bare::TEXT || '</bare>'
	|| '<iddebugmonitor>' || iddebugmonitor::TEXT || '</iddebugmonitor>' 
	|| '<idfpu>' || idfpu::TEXT || '</idfpu>' 
	|| '<installrtos>' || installrtos::TEXT || '</installrtos>' 
	|| '<posixrtems5>' || posixrtems5::TEXT || '</posixrtems5>' 
	|| '<rtems48i>' || rtems48i::TEXT || '</rtems48i>' 
	|| '<rtems5>' || rtems5::TEXT || '</rtems5>' 
	|| '<idtargetboard>' || idtargetboard::TEXT || '</idtargetboard>'
	|| '<idarchitecturetype>' || idarchitecturetype::TEXT || '</idarchitecturetype>' as xml
	
	from public.configuration where id = _idconfiguration);
	
	r_value_arinc653module := (select arinc653module.id from public.arinc653module where idconfiguration  = _idconfiguration);  
	
	IF (r_value_arinc653module > 0) THEN
	
		r_valuetext := r_valuetext || 
						(select xmlelement(name "arinc653module", 
										  xmlattributes(public.arinc653module.id as "id", _idconfiguration as "idconfiguration"), 
										  xmlelement(name "modulename", public.arinc653module.modulename),
										  xmlelement(name "xmlnsxsi", public.arinc653module.xmlnsxsi),
										  (select xmlelement(name "airconfiguration", 
															  xmlattributes(public.airconfiguration.id as "id", r_value_arinc653module as "idarinc653module"), 
															  xmlelement(name "requiredcores", public.airconfiguration.requiredcores),
															  xmlelement(name "tickspersecond", public.airconfiguration.tickspersecond)
															  )
											from public.airconfiguration where public.airconfiguration.idarinc653module = r_value_arinc653module),
										  (select xmlelement(name "moduleschedule", 
															  xmlattributes(public.moduleschedule.id as "id"), 
															  xmlelement(name "initialmoduleschedule", public.moduleschedule.initialmoduleschedule),
															  xmlelement(name "majorframeseconds", public.moduleschedule.majorframeseconds),
															  xmlelement(name "scheduleidentifier", public.moduleschedule.scheduleidentifier),
															  xmlelement(name "schedulename", public.moduleschedule.schedulename),
															  (select 
																		xmlagg(
																				xmlelement(name "partitionschedule", 
																					  xmlattributes(public.partitionschedule.id as "id"), 
																					  xmlelement(name "perioddurationseconds", public.partitionschedule.perioddurationseconds),
																					  xmlelement(name "periodseconds", public.partitionschedule.periodseconds),
																					  (select xmlelement(name "windowschedule", 
															  											xmlattributes(public.windowschedule.id as "id", public.windowschedule.idpartitionschedule as "idpartitionschedule", public.windowschedule.idpartitionconfiguration as "idpartitionconfiguration"), 
															  											xmlelement(name "partitionperiodstart", public.windowschedule.partitionperiodstart),
															  											xmlelement(name "windowdurationseconds", public.windowschedule.windowdurationseconds),
																										xmlelement(name "windowidentifier", public.windowschedule.windowidentifier),
																										xmlelement(name "windowstartseconds", public.windowschedule.windowstartseconds),
																										xmlelement(name "coreidentifier", public.windowschedule.coreidentifier)
															                                            )
																						from public.windowschedule where public.windowschedule.idpartitionschedule = public.partitionschedule.id),
																					   (select xmlelement(name "windowconfiguration", 
															  											xmlattributes(public.windowconfiguration.id as "id", public.windowconfiguration.idpartitionschedule as "idpartitionschedule"), 
															  											xmlelement(name "windowidentifier", public.windowconfiguration.windowidentifier)
															                                            )
																						from public.windowconfiguration where public.windowconfiguration.idpartitionschedule = public.partitionschedule.id)    
																				   )
																				)   
																 from public.partitionschedule where public.partitionschedule.idmoduloschedule = public.moduleschedule.id)						 

															  )
											from public.moduleschedule where public.moduleschedule.idarinc653module = r_value_arinc653module),
										  (select 
												xmlagg(
														xmlelement(name "partitions", 
															  xmlattributes(public.partitions.id as "id", public.partitions.idarinc653module as "idarinc653module"), 
															  xmlelement(name "criticality", public.partitions.criticality),
															  xmlelement(name "entrypoint", public.partitions.entrypoint),
															  xmlelement(name "partitionname", public.partitions.partitionname),
															  xmlelement(name "partitionidentifier", public.partitions.partitionidentifier),
															  xmlelement(name "systempartition", public.partitions.systempartition),
															  (select xmlelement(name "partitionconfiguration", 
																  xmlattributes(public.partitionconfiguration.id as "id", public.partitionconfiguration.idpartition as "idpartition"), 
																  xmlelement(name "cores", public.partitionconfiguration.cores),
																  xmlelement(name "cache", public.partitionconfiguration.cache),
																  xmlelement(name "libs", public.partitionconfiguration.libs),
																  xmlelement(name "personality", public.partitionconfiguration.personality),
																  xmlelement(name "devices", public.partitionconfiguration.devices),
																  xmlelement(name "permissions", public.partitionconfiguration.permissions),
																  (select xmlelement(name "memory", 
																	  xmlattributes(public.memory.id as "id", public.memory.idpartitionconfiguration as "idpartitionconfiguration"), 
																	  xmlelement(name "size", public.memory.size)
																	  )
																	from public.memory where public.memory.idpartitionconfiguration = public.partitionconfiguration.id)				 			 			 
															  )
															  from public.partitionconfiguration where public.partitionconfiguration.idpartition = public.partitions.id)   
														   )
														)   
											from public.partitions where public.partitions.idarinc653module = r_value_arinc653module)
										)
						   from public.arinc653module where public.arinc653module.idconfiguration = _idconfiguration
						);	
						
	END IF;
	
	IF (r_valuetext <> '')THEN
		oxml := r_valuetext || '</configuration>';
		oresultado := 1;
		oresultadodesc := 'XML criado com sucesso!...';
	ELSE
		oxml := '';
		oresultado := 0;
		oresultadodesc := 'Erro a criar o XML!...';
	END IF;
END;
$$;


ALTER FUNCTION public.geraxml(_idconfiguration bigint, _idautenticacao bigint, OUT oxml text, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 267 (class 1255 OID 17505)
-- Name: geraxml_withdesc(bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.geraxml_withdesc(_idconfiguration bigint, _idautenticacao bigint, OUT oxml text, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE 

r_value_arinc653module BIGINT := 0; 
r_valuetext TEXT := ''; 

BEGIN  

	oresultado := 0;
	oresultadodesc := '';
	 
	r_valuetext := '<?xml version="1.0" standalone="yes"?><!DOCTYPE xml>';
	
	r_valuetext := r_valuetext || (select '<configuration id="' || id::TEXT || '">' 
	|| '<archname>' || archname::TEXT || '</archname>'  
    || '<bare>' || bare::TEXT || '</bare>'
	|| '<iddebugmonitor idvalue="' || iddebugmonitor::TEXT || '">' || (select "desc" from public.generaltable where id = iddebugmonitor)::TEXT || '</iddebugmonitor>' 
	|| '<idfpu idvalue="' || idfpu::TEXT || '">' || (select "desc" from public.generaltable where id = idfpu)::TEXT || '</idfpu>' 
	|| '<installrtos>' || installrtos::TEXT || '</installrtos>' 
	|| '<posixrtems5>' || posixrtems5::TEXT || '</posixrtems5>' 
	|| '<rtems48i>' || rtems48i::TEXT || '</rtems48i>' 
	|| '<rtems5>' || rtems5::TEXT || '</rtems5>' 
	|| '<idtargetboard idvalue="' || idtargetboard::TEXT || '">' || (select "desc" from public.generaltable where id = idtargetboard)::TEXT || '</idtargetboard>'
	|| '<idarchitecturetype idvalue="' || idarchitecturetype::TEXT || '">' || (select "desc" from public.generaltable where id = idarchitecturetype)::TEXT || '</idarchitecturetype>' as xml
	
	from public.configuration where id = _idconfiguration);
	
	r_value_arinc653module := (select arinc653module.id from public.arinc653module where idconfiguration  = _idconfiguration);  
	
	IF (r_value_arinc653module > 0) THEN
	
		r_valuetext := r_valuetext || 
						(select xmlelement(name "arinc653module", 
										  xmlattributes(public.arinc653module.id as "id", _idconfiguration as "idconfiguration"), 
										  xmlelement(name "modulename", public.arinc653module.modulename),
										  xmlelement(name "xmlnsxsi", public.arinc653module.xmlnsxsi),
										  (select xmlelement(name "airconfiguration", 
															  xmlattributes(public.airconfiguration.id as "id", r_value_arinc653module as "idarinc653module"), 
															  xmlelement(name "requiredcores", public.airconfiguration.requiredcores),
															  xmlelement(name "tickspersecond", public.airconfiguration.tickspersecond)
															  )
											from public.airconfiguration where public.airconfiguration.idarinc653module = r_value_arinc653module),
										  (select xmlelement(name "moduleschedule", 
															  xmlattributes(public.moduleschedule.id as "id", r_value_arinc653module as "idarinc653module"), 
															  xmlelement(name "initialmoduleschedule", public.moduleschedule.initialmoduleschedule),
															  xmlelement(name "majorframeseconds", public.moduleschedule.majorframeseconds),
															  xmlelement(name "scheduleidentifier", public.moduleschedule.scheduleidentifier),
															  xmlelement(name "schedulename", public.moduleschedule.schedulename),
															  (select 
																		xmlagg(
																				xmlelement(name "partitionschedule", 
																					  xmlattributes(public.partitionschedule.id as "id", public.partitionschedule.idmoduloschedule as "idmoduleschedule"), 
																					  xmlelement(name "perioddurationseconds", public.partitionschedule.perioddurationseconds),
																					  xmlelement(name "periodseconds", public.partitionschedule.periodseconds),
																					  (select xmlelement(name "windowschedule", 
															  											xmlattributes(public.windowschedule.id as "id", public.windowschedule.idpartitionschedule as "idpartitionschedule", public.windowschedule.idpartitionconfiguration as "idpartitionconfiguration"), 
															  											xmlelement(name "partitionperiodstart", public.windowschedule.partitionperiodstart),
															  											xmlelement(name "windowdurationseconds", public.windowschedule.windowdurationseconds),
																										xmlelement(name "windowidentifier", public.windowschedule.windowidentifier),
																										xmlelement(name "windowstartseconds", public.windowschedule.windowstartseconds),
																										xmlelement(name "coreidentifier", public.windowschedule.coreidentifier)
															                                            )
																						from public.windowschedule where public.windowschedule.idpartitionschedule = public.partitionschedule.id),
																					   (select xmlelement(name "windowconfiguration", 
															  											xmlattributes(public.windowconfiguration.id as "id", public.windowconfiguration.idpartitionschedule as "idpartitionschedule"), 
															  											xmlelement(name "windowidentifier", public.windowconfiguration.windowidentifier),
																										xmlelement(name "cores", public.windowconfiguration.cores)  
															                                            )
																						from public.windowconfiguration where public.windowconfiguration.idpartitionschedule = public.partitionschedule.id)    
																				   )
																				)   
																 from public.partitionschedule where public.partitionschedule.idmoduloschedule = public.moduleschedule.id)						 

															  )
											from public.moduleschedule where public.moduleschedule.idarinc653module = r_value_arinc653module),
										  (select 
												xmlagg(
														xmlelement(name "partitions", 
															  xmlattributes(public.partitions.id as "id", public.partitions.idarinc653module as "idarinc653module"), 
															  xmlelement(name "criticality",
																		  xmlattributes(public.partitions.criticality as "idvalue"),
																  		  (select "desc" from public.generaltable where id = public.partitions.criticality)),
															  xmlelement(name "entrypoint", public.partitions.entrypoint),
															  xmlelement(name "partitionname", public.partitions.partitionname),
															  xmlelement(name "partitionidentifier", public.partitions.partitionidentifier),
															  xmlelement(name "systempartition", public.partitions.systempartition),
															  (select xmlelement(name "partitionconfiguration", 
																  xmlattributes(public.partitionconfiguration.id as "id", public.partitionconfiguration.idpartition as "idpartition"), 
																  xmlelement(name "cores", public.partitionconfiguration.cores),
																  xmlelement(name "cache", public.partitionconfiguration.cache),
																  xmlelement(name "libs", xmlattributes(public.partitionconfiguration.libs as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.libs))::TEXT),
																  xmlelement(name "personality", xmlattributes(public.partitionconfiguration.personality as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.personality))::TEXT),
																  xmlelement(name "devices", xmlattributes(public.partitionconfiguration.devices as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.devices))::TEXT),
																  xmlelement(name "permissions", xmlattributes(public.partitionconfiguration.permissions as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.permissions))::TEXT),
																  (select xmlelement(name "memory", 
																	  xmlattributes(public.memory.id as "id", public.memory.idpartitionconfiguration as "idpartitionconfiguration"), 
																	  xmlelement(name "size", public.memory.size)
																	  )
																	from public.memory where public.memory.idpartitionconfiguration = public.partitionconfiguration.id)				 			 			 
															  )
															  from public.partitionconfiguration where public.partitionconfiguration.idpartition = public.partitions.id)   
														   )
														)   
											from public.partitions where public.partitions.idarinc653module = r_value_arinc653module)
										)
						   from public.arinc653module where public.arinc653module.idconfiguration = _idconfiguration
						);	
						
	END IF;
	
	IF (r_valuetext <> '')THEN
		oxml := r_valuetext || '</configuration>';
		oresultado := 1;
		oresultadodesc := 'XML criado com sucesso!...';
	ELSE
		oxml := '';
		oresultado := 0;
		oresultadodesc := 'Erro a criar o XML!...';
	END IF;
END;
$$;


ALTER FUNCTION public.geraxml_withdesc(_idconfiguration bigint, _idautenticacao bigint, OUT oxml text, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 284 (class 1255 OID 17527)
-- Name: geraxml_withdesc_v2(bigint, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.geraxml_withdesc_v2(_idconfiguration bigint, _idautenticacao bigint, OUT oxml text, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value_arinc653module BIGINT := 0; 
r_valuetext TEXT := ''; 

BEGIN   

	oresultado := 0;
	oresultadodesc := '';
	 
	r_valuetext := '<?xml version="1.0" standalone="yes"?><!DOCTYPE xml>';
	
	r_valuetext := r_valuetext || (select '<configuration id="' || id::TEXT || '">' 
	|| '<archname>' || archname::TEXT || '</archname>'  
    || '<bare>' || bare::TEXT || '</bare>'
	|| '<iddebugmonitor idvalue="' || iddebugmonitor::TEXT || '">' || (select "desc" from public.generaltable where id = iddebugmonitor)::TEXT || '</iddebugmonitor>' 
	|| '<idfpu idvalue="' || idfpu::TEXT || '">' || (select "desc" from public.generaltable where id = idfpu)::TEXT || '</idfpu>' 
	|| '<installrtos>' || installrtos::TEXT || '</installrtos>' 
	|| '<posixrtems5>' || posixrtems5::TEXT || '</posixrtems5>' 
	|| '<rtems48i>' || rtems48i::TEXT || '</rtems48i>' 
	|| '<rtems5>' || rtems5::TEXT || '</rtems5>' 
	|| '<idtargetboard idvalue="' || idtargetboard::TEXT || '">' || (select "desc" from public.generaltable where id = idtargetboard)::TEXT || '</idtargetboard>'
	|| '<idarchitecturetype idvalue="' || idarchitecturetype::TEXT || '">' || (select "desc" from public.generaltable where id = idarchitecturetype)::TEXT || '</idarchitecturetype>' as xml
	
	from public.configuration where id = _idconfiguration);
	
	r_value_arinc653module := (select arinc653module.id from public.arinc653module where idconfiguration  = _idconfiguration);  
	
	IF (r_value_arinc653module > 0) THEN
	
		r_valuetext := r_valuetext || 
						(select xmlelement(name "arinc653module", 
										  xmlattributes(public.arinc653module.id as "id", _idconfiguration as "idconfiguration"), 
										  xmlelement(name "modulename", public.arinc653module.modulename),
										  xmlelement(name "xmlnsxsi", public.arinc653module.xmlnsxsi),
										  (select xmlelement(name "airconfiguration", 
															  xmlattributes(public.airconfiguration.id as "id", r_value_arinc653module as "idarinc653module"), 
															  xmlelement(name "requiredcores", public.airconfiguration.requiredcores),
															  xmlelement(name "tickspersecond", public.airconfiguration.tickspersecond)
															  )
											from public.airconfiguration where public.airconfiguration.idarinc653module = r_value_arinc653module),
										  (select xmlelement(name "moduleschedule", 
															  xmlattributes(public.moduleschedule.id as "id", r_value_arinc653module as "idarinc653module"), 
															  xmlelement(name "initialmoduleschedule", public.moduleschedule.initialmoduleschedule),
															  xmlelement(name "majorframeseconds", public.moduleschedule.majorframeseconds),
															  xmlelement(name "scheduleidentifier", public.moduleschedule.scheduleidentifier),
															  xmlelement(name "schedulename", public.moduleschedule.schedulename),
															  (select 
																		xmlagg( 
																				xmlelement(name "partitionschedule", 
																					  xmlattributes(public.partitionschedule.id as "id", public.partitionschedule.idmoduloschedule as "idmoduleschedule"), 
																					  xmlelement(name "perioddurationseconds", public.partitionschedule.perioddurationseconds),
																					  xmlelement(name "periodseconds", public.partitionschedule.periodseconds),
																						   
																					  (select xmlagg( xmlelement(name "windowschedule", 
															  											xmlattributes(public.windowschedule.id as "id", public.windowschedule.idpartitionschedule as "idpartitionschedule", public.windowschedule.idpartitionconfiguration as "idpartitionconfiguration"), 
															  											xmlelement(name "partitionperiodstart", public.windowschedule.partitionperiodstart),
															  											xmlelement(name "windowdurationseconds", public.windowschedule.windowdurationseconds),
																										xmlelement(name "windowidentifier", public.windowschedule.windowidentifier),
																										xmlelement(name "windowstartseconds", public.windowschedule.windowstartseconds),
																										xmlelement(name "coreidentifier", public.windowschedule.coreidentifier)
															                                            ))
																						from public.windowschedule where public.windowschedule.idpartitionschedule = public.partitionschedule.id),
																					   (select xmlelement(name "windowconfiguration", 
															  											xmlattributes(public.windowconfiguration.id as "id", public.windowconfiguration.idpartitionschedule as "idpartitionschedule"), 
															  											xmlelement(name "windowidentifier", public.windowconfiguration.windowidentifier),
																										xmlelement(name "cores", public.windowconfiguration.cores)  
															                                            )
																						from public.windowconfiguration where public.windowconfiguration.idpartitionschedule = public.partitionschedule.id)    
																				   )
																				)   
																 from public.partitionschedule where public.partitionschedule.idmoduloschedule = public.moduleschedule.id)						 

															  )
											from public.moduleschedule where public.moduleschedule.idarinc653module = r_value_arinc653module),
										  (select 
												xmlagg(
														xmlelement(name "partitions", 
															  xmlattributes(public.partitions.id as "id", public.partitions.idarinc653module as "idarinc653module"), 
															  xmlelement(name "criticality",
																		  xmlattributes(public.partitions.criticality as "idvalue"),
																  		  (select "desc" from public.generaltable where id = public.partitions.criticality)),
															  xmlelement(name "entrypoint", public.partitions.entrypoint),
															  xmlelement(name "partitionname", public.partitions.partitionname),
															  xmlelement(name "partitionidentifier", public.partitions.partitionidentifier),
															  xmlelement(name "systempartition", public.partitions.systempartition),
															  (select xmlelement(name "partitionconfiguration", 
																  xmlattributes(public.partitionconfiguration.id as "id", public.partitionconfiguration.idpartition as "idpartition"), 
																  xmlelement(name "cores", public.partitionconfiguration.cores),
																  xmlelement(name "cache", public.partitionconfiguration.cache),
																  xmlelement(name "libs", xmlattributes(public.partitionconfiguration.libs as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.libs))::TEXT),
																  xmlelement(name "personality", xmlattributes(public.partitionconfiguration.personality as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.personality))::TEXT),
																  xmlelement(name "devices", xmlattributes(public.partitionconfiguration.devices as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.devices))::TEXT),
																  xmlelement(name "permissions", xmlattributes(public.partitionconfiguration.permissions as "idvalue"), (select * from public.obtem_desc_por_codigo(public.partitionconfiguration.permissions))::TEXT),
																  (select xmlelement(name "memory", 
																	  xmlattributes(public.memory.id as "id", public.memory.idpartitionconfiguration as "idpartitionconfiguration"), 
																	  xmlelement(name "size", public.memory.size)
																	  )
																	from public.memory where public.memory.idpartitionconfiguration = public.partitionconfiguration.id)				 			 			 
															  )
															  from public.partitionconfiguration where public.partitionconfiguration.idpartition = public.partitions.id)   
														   )
														)   
											from public.partitions where public.partitions.idarinc653module = r_value_arinc653module)
										)
						   from public.arinc653module where public.arinc653module.idconfiguration = _idconfiguration
						);	
						
	END IF;
	
	IF (r_valuetext <> '')THEN
		oxml := r_valuetext || '</configuration>';
		oresultado := 1;
		oresultadodesc := 'XML criado com sucesso!...';
	ELSE
		oxml := '';
		oresultado := 0;
		oresultadodesc := 'Erro a criar o XML!...';
	END IF;
END;
$$;


ALTER FUNCTION public.geraxml_withdesc_v2(_idconfiguration bigint, _idautenticacao bigint, OUT oxml text, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 251 (class 1255 OID 17447)
-- Name: insereutilizador(character varying, character varying, character varying, integer, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.insereutilizador(_nome character varying, _email character varying, _pws character varying, _idperfilutilizador integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;
 
BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	INSERT INTO public.utilizador(nome, email, activo, idperfilutilizador) 
	VALUES (_nome, _email, 'S', _idperfilutilizador)
	RETURNING utilizador.id INTO r_value;

	IF ( r_value > 0 and not r_value isnull) THEN 

		INSERT INTO public.autenticacao(idutilizador, pws, activo)
		VALUES (r_value, _pws,'S')
		RETURNING autenticacao.id INTO r_value;

		IF ( r_value > 0 and not r_value isnull) THEN

			oresultado := 1;
			oresultadodesc := 'Utilizador criado com sucesso!...';
			
			INSERT INTO auditoria (idautenticacao, descricao)
			VALUES (_idautenticacao,  'Utilizador: ' || _email ||' criado com sucesso!...'::TEXT)
			RETURNING auditoria.id INTO r_valueaudite;
			
		ELSE
			ROLLBACK;
			oresultado := -1;
			oresultadodesc := 'Erro a criar o utilizador!...';	
			
			INSERT INTO auditoria (idautenticacao, descricao)
			VALUES (_idautenticacao,  'Erro a criar o utilizador: ' || _email || ' (tabela autenticacao)'::TEXT) 
			RETURNING auditoria.id INTO r_valueaudite;
		END IF;
	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar o utilizador!...';
		
		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar o utilizador: ' || _email || ' (tabela utilizador)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.insereutilizador(_nome character varying, _email character varying, _pws character varying, _idperfilutilizador integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 279 (class 1255 OID 17518)
-- Name: inserexml(text, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.inserexml(_xml text, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE
 
r_valuetext Text [];
 
r_temp_id bigint [];
r_configurationid bigint := 0;

BEGIN 
 
	oresultado := 0;
	oresultadodesc := '';
	
	IF (select xml_is_well_formed(_xml)) <> true THEN
		oresultado := 0;
		oresultadodesc := 'não validado';
		RETURN;
	END IF;
	
	r_valuetext :=(select xpath('//configuration/@id', _xml::xml));
	
	IF (select ARRAY_LENGTH(r_valuetext, 1)) > 1 THEN
		oresultado := 0;
		oresultadodesc := 'Configuration repetida mais de uma vez!...';
		RETURN;
	END IF;	
	
	r_configurationid := r_valuetext[1]::bigint;
	
	oresultadodesc := (select xpath_exists('//configuration/archname/text()', _xml::xml));
	
	--oresultadodesc :=(select xpath('//configuration/archname/text()', _xml::xml));
	
	--r_valuetext :=(select unnest(xpath('//configuration/archname/text()', _xml::xml)));
	--r_valuetext :=(select xpath('//configuration/archname/text()', _xml::xml));
	--r_valuetext :=(select xpath('//configuration/@id', _xml::xml));
	
	--r_valuetext :=(select xpath('name(/configuration/*)', _xml::xml));
	--r_valuetext :=(select xpath('//configuration/archname/node()', _xml::xml));

	
	
	oresultado := 1;
	--oresultadodesc := r_valuetext;
END;
$$;


ALTER FUNCTION public.inserexml(_xml text, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO ariga;

--
-- TOC entry 247 (class 1255 OID 17442)
-- Name: manutencaoalteraentrada(integer, character varying, character varying, character varying, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.manutencaoalteraentrada(_idtabela integer, _cod character varying, _desc character varying, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;

BEGIN 

	oresultado := 0;
	oresultadodesc := '';

	UPDATE public.generaltable SET
  	cod = COALESCE(NULLIF(_cod, ''), cod),
  	"desc" = COALESCE(NULLIF(_desc, ''), "desc"),
	activo = COALESCE(NULLIF(_activo, ''), activo),
	dataalteracao = now(),
	horaalteracao = now()
	WHERE id =_idtabela
	RETURNING generaltable.id INTO r_value;
	
	IF ( r_value > 0 and not r_value isnull) THEN 
		oresultado := 1;
		oresultadodesc := 'Entrada de tabela alterada com sucesso!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Entrada na tabela : ' || _idtabela::TEXT ||' alterarado com sucesso!...'::TEXT)
		RETURNING auditoria.id INTO r_valueaudite;
	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a alterar entrada de tabela!...';
		
		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a alterar entrada na tabela: ' || _idtabela::TEXT || ' (tabela tabcoddesc)'::TEXT) 
		RETURNING auditoria.id INTO r_valueaudite;
	END IF;

END;
$$;


ALTER FUNCTION public.manutencaoalteraentrada(_idtabela integer, _cod character varying, _desc character varying, _activo character varying, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO postgres;

--
-- TOC entry 248 (class 1255 OID 17443)
-- Name: manutencaoinserenovaentrada(character varying, character varying, character varying, character varying, character varying, integer, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.manutencaoinserenovaentrada(_tabela character varying, _cod character varying, _desc character varying, _desctabela character varying, _activo character varying, _tipo integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) RETURNS record
    LANGUAGE plpgsql
    AS $$
DECLARE

r_value BIGINT := 0; 
r_valueaudite BIGINT := 0;

BEGIN 

	oresultado := 0;
	oresultadodesc := ''; 

	INSERT INTO public.generaltable(codtable, cod, "desc", desctable, activo, tipo)
	VALUES (_tabela, _cod, _desc, _desctabela, _activo, _tipo)
	RETURNING generaltable.id INTO r_value;
	
	IF ( r_value > 0 and not r_value isnull) THEN 

		oresultado := 1;
		oresultadodesc := 'Nova entrada criada com sucesso na tabela!...';

		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Nova entrada criada na tabela: ' || _desctabela ||' com sucesso!...'::TEXT);
			
	ELSE
		ROLLBACK;
		oresultado := -1;
		oresultadodesc := 'Erro a criar nova entrada na tabela!...';
		
		INSERT INTO auditoria (idautenticacao, descricao)
		VALUES (_idautenticacao,  'Erro a criar nova entrada na tabela:: ' || _desctabela || ' (tabela generaltable)'::TEXT);

	END IF;

END;
$$;


ALTER FUNCTION public.manutencaoinserenovaentrada(_tabela character varying, _cod character varying, _desc character varying, _desctabela character varying, _activo character varying, _tipo integer, _idautenticacao bigint, OUT oresultado bigint, OUT oresultadodesc character varying) OWNER TO postgres;

--
-- TOC entry 278 (class 1255 OID 17517)
-- Name: obtem_desc_por_codigo(character varying); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.obtem_desc_por_codigo(_arraystring character varying) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE 

    dateval integer[];
	temp_s character varying := '';
	return_s text := '';
	lenght integer := 0;
 
BEGIN  

	dateval := (SELECT string_to_array(_arraystring, ';'))::integer[];

	lenght := array_length(dateval, 1);
	
	IF (lenght > 0) THEN
	  	FOR num IN 1..lenght LOOP
			select "desc" into temp_s from public.generaltable where id = dateval[num];
			IF(num > 1)THEN
				return_s:= return_s || ';' || temp_s;
			ELSE	
				return_s:= temp_s;
			END IF;
	  	END LOOP;
		RAISE INFO '%', return_s;
	END IF;
	RETURN return_s;
END;
$$;


ALTER FUNCTION public.obtem_desc_por_codigo(_arraystring character varying) OWNER TO ariga;

--
-- TOC entry 252 (class 1255 OID 17448)
-- Name: obtem_idautenticacao_idutilizador(bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.obtem_idautenticacao_idutilizador(_idutilizador bigint) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE  

retorno BIGINT;  

BEGIN
	SELECT id INTO retorno 
	FROM    public.autenticacao
	WHERE   idutilizador = _idutilizador;
		 
	IF retorno isnull THEN retorno := 0;
	
	END IF;
	
	RETURN retorno;
END;
$$;


ALTER FUNCTION public.obtem_idautenticacao_idutilizador(_idutilizador bigint) OWNER TO ariga;

--
-- TOC entry 242 (class 1255 OID 17406)
-- Name: obtem_idutilizador_autenticacao(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obtem_idutilizador_autenticacao(_idautenticacao character varying) RETURNS bigint
    LANGUAGE plpgsql
    AS $$
DECLARE  

retorno BIGINT;

BEGIN
	SELECT id INTO retorno 
	FROM    utilizador
	WHERE   email = _idautenticacao and activo = 'S';
		 
	IF retorno isnull THEN retorno := 0;
	
	END IF;
	
	RETURN retorno;
END;$$;


ALTER FUNCTION public.obtem_idutilizador_autenticacao(_idautenticacao character varying) OWNER TO postgres;

--
-- TOC entry 253 (class 1255 OID 17449)
-- Name: obtemlista_gestaoair_total(character varying); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.obtemlista_gestaoair_total(_codtable character varying) RETURNS TABLE(id bigint, "desc" character varying, codtable character varying, activo character varying, tipo integer)
    LANGUAGE plpgsql
    AS $$

BEGIN

	RETURN QUERY   
	
	select configuration.id AS id, configuration.archname AS desc, 'CONF'::character varying as "codtable", configuration.activo, 1 as "tipo"
	from public.configuration
	 
	ORDER BY codtable;
END; 
$$;


ALTER FUNCTION public.obtemlista_gestaoair_total(_codtable character varying) OWNER TO ariga;

--
-- TOC entry 226 (class 1255 OID 17439)
-- Name: obtemlista_sistema_total(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.obtemlista_sistema_total(_codtable character varying) RETURNS TABLE(id integer, "desc" character varying, codtable character varying, activo character varying, tipo integer)
    LANGUAGE plpgsql
    AS $$

BEGIN
	
	RETURN QUERY 
	
	select generaltable.id, generaltable.desc, generaltable.codtable, generaltable.activo, generaltable.tipo
	from public.generaltable;
	
END;  
$$;


ALTER FUNCTION public.obtemlista_sistema_total(_codtable character varying) OWNER TO postgres;

--
-- TOC entry 254 (class 1255 OID 17450)
-- Name: pesquisa_autenticacao(character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.pesquisa_autenticacao(_iemail character varying, _idautenticacao bigint) RETURNS TABLE(oidautenticacao bigint, outilizador character varying, odatahora character varying, oactivo character varying)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY
	
	select autenticacao.id, utilizador.email, 
	(CAST(autenticacao.dataalteracao AS character varying) || ' - ' || CAST(autenticacao.horaalteracao AS character varying))::character varying,
	autenticacao.activo as "activo"
	from public.autenticacao
	INNER JOIN
	public.utilizador
	ON autenticacao.idutilizador = utilizador.id
	where utilizador.email = _iemail;
	 
	INSERT INTO auditoria (idautenticacao, descricao)
	VALUES (_idautenticacao,  'Pesquisou autenticação: ' || _iemail::TEXT);
	
END; 
$$;


ALTER FUNCTION public.pesquisa_autenticacao(_iemail character varying, _idautenticacao bigint) OWNER TO ariga;

--
-- TOC entry 227 (class 1255 OID 17440)
-- Name: pesquisa_manutencao_nome_tabelas(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pesquisa_manutencao_nome_tabelas(_tipotable integer) RETURNS TABLE(ocodtable character varying, odesctable character varying, otipotable integer)
    LANGUAGE plpgsql
    AS $$

BEGIN
	
	RETURN QUERY
	
	select distinct codtable, desctable, tipo
	from public.generaltable;
	
END;  
$$;


ALTER FUNCTION public.pesquisa_manutencao_nome_tabelas(_tipotable integer) OWNER TO postgres;

--
-- TOC entry 245 (class 1255 OID 17441)
-- Name: pesquisa_manutencao_tabelas(character varying, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.pesquisa_manutencao_tabelas(_tabela character varying, _idautenticacao bigint) RETURNS TABLE(oidtabela integer, ocodtabela character varying, ocod character varying, odesc character varying, odesctabela character varying, oactivo character varying, odatahora character varying)
    LANGUAGE plpgsql
    AS $$

BEGIN
	
	RETURN QUERY
	
	
	select id, codtable, cod, "desc", desctable, activo,
	(CAST(generaltable.dataalteracao AS character varying) || ' - ' || CAST(generaltable.horaalteracao AS character varying))::character varying
	from public.generaltable where codtable = _tabela;
	
	INSERT INTO auditoria (idautenticacao, descricao)
	VALUES (_idautenticacao,  'Pesquisou na tabcoddesc com código de tabela: ' || _tabela::TEXT);
	
END; 
$$;


ALTER FUNCTION public.pesquisa_manutencao_tabelas(_tabela character varying, _idautenticacao bigint) OWNER TO postgres;

--
-- TOC entry 255 (class 1255 OID 17451)
-- Name: pesquisa_perfilutilizador(character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.pesquisa_perfilutilizador(_email character varying, _idautenticacao bigint) RETURNS TABLE(oidutilizador bigint, onome character varying, ocodutilizador character varying, oidperfilutilizador integer, operfilutilizador character varying, odatahora character varying)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY 
	select 
	utilizador.id,
	utilizador.nome,
	utilizador.email,
	utilizador.idperfilutilizador,
	(select public.generaltable.desc from public.generaltable where public.generaltable.id = utilizador.idperfilutilizador),
	(CAST(utilizador.dataalteracao AS character varying) || ' - ' || CAST(utilizador.horaalteracao AS character varying))::character varying
	from
	public.utilizador
	where public.utilizador.email = _email; 
	
	INSERT INTO auditoria (idautenticacao, descricao)
	VALUES (_idautenticacao,  'Pesquisou perfil utilizador: ' || _email::TEXT);
	
END;
$$;


ALTER FUNCTION public.pesquisa_perfilutilizador(_email character varying, _idautenticacao bigint) OWNER TO ariga;

--
-- TOC entry 256 (class 1255 OID 17452)
-- Name: pesquisa_utilizador(character varying, bigint); Type: FUNCTION; Schema: public; Owner: ariga
--

CREATE FUNCTION public.pesquisa_utilizador(_email character varying, _idautenticacao bigint) RETURNS TABLE(oidutilizador bigint, onome character varying, ocodutilizador character varying, oactivo character varying, oidperfilutilizador integer, operfilutilizador character varying, odatahora character varying)
    LANGUAGE plpgsql
    AS $$

BEGIN
	RETURN QUERY
	select  
	utilizador.id,
	utilizador.nome,
	utilizador.email,
	utilizador.activo,
	utilizador.idperfilutilizador,
	(select public.generaltable.desc from public.generaltable where public.generaltable.id = utilizador.idperfilutilizador),
	(CAST(utilizador.dataalteracao AS character varying) || ' - ' || CAST(utilizador.horaalteracao AS character varying))::character varying
	from
	public.utilizador
	where public.utilizador.email LIKE _email; 
	
	INSERT INTO auditoria (idautenticacao, descricao)
	VALUES (_idautenticacao,  'Pesquisou utilizador: ' || _email::TEXT);
	
END;
$$;


ALTER FUNCTION public.pesquisa_utilizador(_email character varying, _idautenticacao bigint) OWNER TO ariga;

--
-- TOC entry 241 (class 1255 OID 17407)
-- Name: verifica_autenticacao(bigint, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verifica_autenticacao(_idutilizador bigint, _chave character varying) RETURNS bigint
    LANGUAGE plpgsql
    AS $$DECLARE 

retorno BIGINT;

BEGIN
	SELECT id INTO retorno
	FROM    autenticacao
	WHERE   idutilizador = _idutilizador and pws = _chave and activo = 'S';
		
	IF retorno isnull THEN retorno := 0;
	
	END IF; 
	
	RETURN retorno;
END;$$;


ALTER FUNCTION public.verifica_autenticacao(_idutilizador bigint, _chave character varying) OWNER TO postgres;

--
-- TOC entry 243 (class 1255 OID 17435)
-- Name: verifica_autenticacao_devolv_ids(character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verifica_autenticacao_devolv_ids(ilogin character varying, ichave character varying) RETURNS TABLE(idautenticacao bigint, idutilizador bigint, idperfilutilizador integer, codperfil character varying, idsessao bigint, oresultado integer, oresultadodesc character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE  
				  
r_valueidutilizador BIGINT := 0; 					  
r_valueverificautilizador BIGINT := 0; 
r_value_verifica_pws BIGINT :=0;
r_value_id_sessao BIGINT :=0; 
r_valueaudite BIGINT :=0;

BEGIN
	
	r_valueidutilizador := (SELECT public.obtem_idutilizador_autenticacao(ilogin));
					  
	IF r_valueidutilizador > 0 THEN 
		
		r_value_verifica_pws := (SELECT public.verifica_autenticacao(r_valueidutilizador, ichave));
		
		IF r_value_verifica_pws > 0 THEN 
		
			INSERT INTO sessao (idautenticacao) 
			VALUES (r_value_verifica_pws) 
			RETURNING sessao.id INTO r_value_id_sessao; 
			
			IF r_value_id_sessao > 0 THEN
			
				INSERT INTO auditoria (idautenticacao, descricao)
				VALUES (r_value_verifica_pws, 'Login efetuado com sucesso!...'::TEXT) 
				RETURNING auditoria.id INTO r_valueaudite;
						
				Return query  
				  SELECT a.id as "idautenticacao", a.idutilizador as "idutilizador", b.idperfilutilizador as "idperfilutilizador", (select cod from generaltable where id = b.idperfilutilizador) as "codperfil",
				  r_value_id_sessao as "idsessao", 1 as "oresultado" , 'Login efetuado com sucesso!...'::character varying as "oresultadodesc"
				   from autenticacao a
				   INNER JOIN utilizador b
				   ON a.idutilizador = b.id
				   WHERE   a.idutilizador = r_valueidutilizador and a.pws = ichave;
			ELSE

				INSERT INTO sigi_auditoria (idautenticacao, descricao) 
				VALUES (r_value_verifica_pws, 'Login sem sucesso(Erro inserir sessão!...)'::TEXT) 
				RETURNING sigi_auditoria.id INTO r_valueaudite;

				Return query select '0'::bigint, '0'::bigint, '0'::integer, ''::character varying, '0'::bigint, '0'::integer, 'Login sem sucesso. Sessão inválida!...'::character varying;
			END IF;
		ELSE
			Return query select '0'::bigint, '0'::bigint, '0'::integer, ''::character varying, '0'::bigint, '0'::integer, 'Autenticação desativada, utilizador inválido ou password inválida!...'::character varying;
	
		END IF;	   
	ELSE
		Return query select '0'::bigint, '0'::bigint, '0'::integer, ''::character varying, '0'::bigint, '0'::integer, 'Utilizador inactivado!...'::character varying;
	
	END IF;
		   
END;$$;


ALTER FUNCTION public.verifica_autenticacao_devolv_ids(ilogin character varying, ichave character varying) OWNER TO postgres;

--
-- TOC entry 244 (class 1255 OID 17436)
-- Name: verifica_sessao(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verifica_sessao(iidsessao bigint) RETURNS TABLE(oresultado smallint, oresultadodesc character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE 

var_data date;
var_hora time; 

BEGIN
	
    select datacriacao, horacriacao
        INTO
        var_data, var_hora
        from sessao where id = iidsessao;
	IF (var_data != now()::date)THEN 
		return query(select 0::smallint, 'Sessão Expirada!...'::character varying);
	ELSE
		var_hora := var_hora + interval '60 minutes';
		IF (var_hora >= now()::time)THEN 
			return query(select 1::smallint, 'Sessão válida!...'::character varying);
		ELSE
			return query(select 0::smallint, 'Sessão Expirada!...'::character varying);
		END IF;
	END IF;
END;
$$;


ALTER FUNCTION public.verifica_sessao(iidsessao bigint) OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 17405)
-- Name: verifica_utilizador(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.verifica_utilizador(iemail character varying) RETURNS TABLE(oresultado smallint, oresultadodesc character varying, ocode character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE 

var_id BIGINT := 0; 
var_ativo character varying := ''; 
var_char_inicio character varying := '';  
var_char_fim character varying := ''; 
var_concatena character varying := ''; 
var_posicao smallint := 0; 
var_tamanho_texto smallint := 0;


BEGIN
	
    select id, activo
        INTO
        var_id, var_ativo
        from utilizador where email = iemail;
	IF (var_id > 0 AND var_ativo = 'S')THEN 
		var_posicao = POSITION('@' IN iemail);
		IF (var_posicao > 2)THEN
			var_tamanho_texto := var_posicao - 1;
			var_char_inicio := SUBSTRING (iemail, 1, 1);
			var_char_fim := SUBSTRING (iemail, var_tamanho_texto, 1);
			var_concatena := var_char_inicio || coalesce(cast(var_id as character varying),'') || var_char_fim;
			return query(select 1::smallint, 'Utilizador registado.'::character varying, var_concatena::character varying);			
		ELSE
			return query(select 0::smallint, 'ERRO!...Utilizador inválido.'::character varying, ''::character varying);
		END IF;
	ELSE
		IF (var_ativo = 'N' OR var_ativo = '')THEN
			return query(select 0::smallint, 'ERRO!...Utilizador desativado.'::character varying, ''::character varying);
		ELSE
			return query(select 0::smallint, 'ERRO!...Utilizador inválido.'::character varying, ''::character varying);
		END IF;
	END IF;
END;
$$;


ALTER FUNCTION public.verifica_utilizador(iemail character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 217 (class 1259 OID 16978)
-- Name: airconfiguration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airconfiguration (
    id bigint NOT NULL,
    requiredcores integer NOT NULL,
    tickspersecond integer NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idarinc653module bigint NOT NULL
);


ALTER TABLE public.airconfiguration OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16976)
-- Name: AIRConfiguration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.airconfiguration ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."AIRConfiguration_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 198 (class 1259 OID 16402)
-- Name: partitionconfiguration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partitionconfiguration (
    id bigint NOT NULL,
    cache text DEFAULT ''::text NOT NULL,
    cores integer DEFAULT 0 NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idpartition bigint NOT NULL,
    libs text DEFAULT ''::text NOT NULL,
    personality text DEFAULT ''::text NOT NULL,
    devices text DEFAULT ''::text NOT NULL,
    permissions text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.partitionconfiguration OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16429)
-- Name: PartitionConfiguration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.partitionconfiguration ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."PartitionConfiguration_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 205 (class 1259 OID 16800)
-- Name: windowschedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.windowschedule (
    id bigint NOT NULL,
    partitionperiodstart boolean DEFAULT false NOT NULL,
    windowdurationseconds numeric(6,5) DEFAULT 0 NOT NULL,
    windowidentifier integer NOT NULL,
    windowstartseconds numeric(6,5) DEFAULT 0 NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idpartitionschedule bigint NOT NULL,
    idpartitionconfiguration bigint DEFAULT 0 NOT NULL,
    coreidentifier integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.windowschedule OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16798)
-- Name: WindowScheduleElement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.windowschedule ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."WindowScheduleElement_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 17040)
-- Name: arinc653module; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.arinc653module (
    id bigint NOT NULL,
    modulename character varying(20) DEFAULT ''::character varying NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    xmlnsxsi text DEFAULT ''::text NOT NULL,
    idconfiguration bigint NOT NULL
);


ALTER TABLE public.arinc653module OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 17201)
-- Name: arinc653module_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.arinc653module ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.arinc653module_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 225 (class 1259 OID 17421)
-- Name: auditoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auditoria (
    id bigint NOT NULL,
    idautenticacao bigint NOT NULL,
    descricao character varying(300) NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.auditoria OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17419)
-- Name: auditoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auditoria ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.auditoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 213 (class 1259 OID 16945)
-- Name: autenticacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.autenticacao (
    id bigint NOT NULL,
    idutilizador bigint NOT NULL,
    pws character varying(40) NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL
);


ALTER TABLE public.autenticacao OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16943)
-- Name: autenticacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.autenticacao ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.autenticacao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 221 (class 1259 OID 17078)
-- Name: configuration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.configuration (
    id bigint NOT NULL,
    archname character varying(20) DEFAULT ''::character varying NOT NULL,
    bare boolean DEFAULT false NOT NULL,
    iddebugmonitor integer NOT NULL,
    idfpu integer NOT NULL,
    installrtos boolean DEFAULT false NOT NULL,
    posixrtems5 boolean DEFAULT false NOT NULL,
    rtems48i boolean DEFAULT false NOT NULL,
    rtems5 boolean DEFAULT false NOT NULL,
    idtargetboard integer NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idarchitecturetype integer NOT NULL
);


ALTER TABLE public.configuration OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17199)
-- Name: configuration_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.configuration ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.configuration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 201 (class 1259 OID 16460)
-- Name: generaltable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.generaltable (
    id integer NOT NULL,
    cod character varying(5) NOT NULL,
    codtable character varying(5) NOT NULL,
    "desc" character varying(60) NOT NULL,
    desctable character varying(30) NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    tipo integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.generaltable OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16458)
-- Name: generaltable_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.generaltable ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.generaltable_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 197 (class 1259 OID 16396)
-- Name: memory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.memory (
    id bigint NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idpartitionconfiguration bigint NOT NULL,
    size character varying NOT NULL
);


ALTER TABLE public.memory OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16394)
-- Name: memory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.memory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.memory_id_seq OWNER TO postgres;

--
-- TOC entry 3117 (class 0 OID 0)
-- Dependencies: 196
-- Name: memory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.memory_id_seq OWNED BY public.memory.id;


--
-- TOC entry 219 (class 1259 OID 16990)
-- Name: moduleschedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.moduleschedule (
    id bigint NOT NULL,
    initialmoduleschedule boolean DEFAULT false NOT NULL,
    majorframeseconds numeric(6,5) DEFAULT 0 NOT NULL,
    scheduleidentifier integer NOT NULL,
    schedulename character varying(20) DEFAULT ''::character varying NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idarinc653module bigint NOT NULL
);


ALTER TABLE public.moduleschedule OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16988)
-- Name: moduleschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.moduleschedule ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.moduleschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 203 (class 1259 OID 16688)
-- Name: partitions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partitions (
    id bigint NOT NULL,
    criticality integer DEFAULT 0 NOT NULL,
    partitionname character varying(20) NOT NULL,
    partitionidentifier integer NOT NULL,
    systempartition boolean DEFAULT false NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idarinc653module bigint NOT NULL,
    entrypoint text DEFAULT ''::text NOT NULL
);


ALTER TABLE public.partitions OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16686)
-- Name: partitions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.partitions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.partitions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 209 (class 1259 OID 16893)
-- Name: partitionschedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partitionschedule (
    id bigint NOT NULL,
    perioddurationseconds numeric(6,5) NOT NULL,
    periodseconds numeric(6,5) NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idmoduloschedule bigint NOT NULL
);


ALTER TABLE public.partitionschedule OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16891)
-- Name: partitionschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.partitionschedule ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.partitionschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 16962)
-- Name: sessao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessao (
    id bigint NOT NULL,
    idautenticacao bigint NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessao OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16960)
-- Name: sessao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.sessao ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sessao_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 211 (class 1259 OID 16925)
-- Name: utilizador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilizador (
    id bigint NOT NULL,
    nome character varying(80) DEFAULT ''::character varying NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    email character varying(30) NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    idperfilutilizador integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.utilizador OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16923)
-- Name: utilizador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.utilizador ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.utilizador_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 206 (class 1259 OID 16861)
-- Name: windowconfiguration; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.windowconfiguration (
    id bigint NOT NULL,
    windowidentifier integer NOT NULL,
    datacriacao date DEFAULT now() NOT NULL,
    dataalteracao date DEFAULT now() NOT NULL,
    horacriacao time without time zone DEFAULT now() NOT NULL,
    horaalteracao time without time zone DEFAULT now() NOT NULL,
    activo character varying(1) DEFAULT 'S'::character varying NOT NULL,
    cores integer NOT NULL,
    idpartitionschedule bigint NOT NULL
);


ALTER TABLE public.windowconfiguration OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16864)
-- Name: windowconfigurationelement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.windowconfiguration ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.windowconfigurationelement_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2806 (class 2604 OID 16412)
-- Name: memory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memory ALTER COLUMN id SET DEFAULT nextval('public.memory_id_seq'::regclass);


--
-- TOC entry 3099 (class 0 OID 16978)
-- Dependencies: 217
-- Data for Name: airconfiguration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airconfiguration (id, requiredcores, tickspersecond, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idarinc653module) FROM stdin;
1	4	200	2024-10-23	2025-06-27	22:20:06.575774	10:30:23.462107	S	1
5	4	200	2025-06-27	2025-06-27	11:23:54.130758	11:28:33.931877	S	2
\.


--
-- TOC entry 3102 (class 0 OID 17040)
-- Dependencies: 220
-- Data for Name: arinc653module; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.arinc653module (id, modulename, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, xmlnsxsi, idconfiguration) FROM stdin;
1	scenario	2024-10-23	2025-06-19	22:18:55.553483	15:51:53.813886	S	http://www.w3.org/2001/XMLSchema-instance	1
2	arquitectura 2	2025-06-27	2025-06-27	10:53:31.525953	10:53:31.525953	S	xmlns:xsi	3
\.


--
-- TOC entry 3107 (class 0 OID 17421)
-- Dependencies: 225
-- Data for Name: auditoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auditoria (id, idautenticacao, descricao, datacriacao, horacriacao, dataalteracao, horaalteracao) FROM stdin;
1	2	Login efetuado com sucesso!...	2025-01-30	20:18:21.51778	2025-01-30	20:18:21.51778
2	2	Login efetuado com sucesso!...	2025-02-05	17:06:52.252524	2025-02-05	17:06:52.252524
3	2	Login efetuado com sucesso!...	2025-02-05	17:35:57.643819	2025-02-05	17:35:57.643819
4	2	Login efetuado com sucesso!...	2025-02-07	18:48:06.318373	2025-02-07	18:48:06.318373
5	2	Login efetuado com sucesso!...	2025-02-07	18:50:00.685037	2025-02-07	18:50:00.685037
6	2	Login efetuado com sucesso!...	2025-02-07	19:17:46.965248	2025-02-07	19:17:46.965248
7	2	Login efetuado com sucesso!...	2025-02-09	16:10:22.943937	2025-02-09	16:10:22.943937
8	2	Login efetuado com sucesso!...	2025-02-09	16:41:27.414654	2025-02-09	16:41:27.414654
9	2	Login efetuado com sucesso!...	2025-02-09	16:54:23.548283	2025-02-09	16:54:23.548283
10	2	Login efetuado com sucesso!...	2025-02-09	18:35:27.880051	2025-02-09	18:35:27.880051
11	2	Login efetuado com sucesso!...	2025-02-15	15:43:52.192201	2025-02-15	15:43:52.192201
12	2	Login efetuado com sucesso!...	2025-02-15	18:02:25.407165	2025-02-15	18:02:25.407165
13	2	Login efetuado com sucesso!...	2025-02-15	18:53:52.753743	2025-02-15	18:53:52.753743
14	2	Login efetuado com sucesso!...	2025-02-15	18:59:36.877865	2025-02-15	18:59:36.877865
15	2	Login efetuado com sucesso!...	2025-02-16	14:09:44.266024	2025-02-16	14:09:44.266024
16	2	Login efetuado com sucesso!...	2025-02-16	15:11:30.175167	2025-02-16	15:11:30.175167
17	2	Login efetuado com sucesso!...	2025-02-16	16:20:47.955247	2025-02-16	16:20:47.955247
18	2	Pesquisou na tabcoddesc com código de tabela: PMY	2025-02-16	16:53:13.65153	2025-02-16	16:53:13.65153
19	2	Pesquisou na tabcoddesc com código de tabela: PER	2025-02-16	16:56:01.301411	2025-02-16	16:56:01.301411
20	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-02-16	16:57:05.590984	2025-02-16	16:57:05.590984
21	2	Pesquisou na tabcoddesc com código de tabela: AN	2025-02-16	16:59:42.603787	2025-02-16	16:59:42.603787
22	2	Pesquisou na tabcoddesc com código de tabela: AN	2025-02-16	17:01:32.926375	2025-02-16	17:01:32.926375
23	2	Pesquisou na tabcoddesc com código de tabela: DM	2025-02-16	17:02:16.133719	2025-02-16	17:02:16.133719
24	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-02-16	17:04:33.734543	2025-02-16	17:04:33.734543
25	2	Pesquisou na tabcoddesc com código de tabela: STA	2025-02-16	17:08:11.950924	2025-02-16	17:08:11.950924
26	2	Login efetuado com sucesso!...	2025-02-17	20:06:03.061198	2025-02-17	20:06:03.061198
27	2	Pesquisou na tabcoddesc com código de tabela: STA	2025-02-17	20:06:25.856924	2025-02-17	20:06:25.856924
28	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-02-17	20:42:55.230247	2025-02-17	20:42:55.230247
29	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-02-17	20:44:51.814519	2025-02-17	20:44:51.814519
30	2	Entrada na tabela : 5 alterarado com sucesso!...	2025-02-17	20:46:18.261897	2025-02-17	20:46:18.261897
31	2	Entrada na tabela : 5 alterarado com sucesso!...	2025-02-17	20:54:05.814246	2025-02-17	20:54:05.814246
32	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-02-17	20:54:12.045095	2025-02-17	20:54:12.045095
33	2	Entrada na tabela : 5 alterarado com sucesso!...	2025-02-17	20:54:39.019526	2025-02-17	20:54:39.019526
34	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-02-17	20:54:43.011651	2025-02-17	20:54:43.011651
35	2	Entrada na tabela : 5 alterarado com sucesso!...	2025-02-17	20:54:59.379512	2025-02-17	20:54:59.379512
36	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-02-17	20:55:04.209265	2025-02-17	20:55:04.209265
37	2	Login efetuado com sucesso!...	2025-02-17	21:28:33.972343	2025-02-17	21:28:33.972343
38	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-02-17	21:28:47.436796	2025-02-17	21:28:47.436796
39	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-02-17	21:33:20.681138	2025-02-17	21:33:20.681138
40	2	Nova entrada criada na tabela: Libs com sucesso!...	2025-02-17	21:37:47.507831	2025-02-17	21:37:47.507831
41	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-02-17	21:41:33.381745	2025-02-17	21:41:33.381745
42	2	Nova entrada criada na tabela: Libs com sucesso!...	2025-02-17	21:42:21.83434	2025-02-17	21:42:21.83434
43	2	Nova entrada criada na tabela: Libs com sucesso!...	2025-02-17	21:45:26.639363	2025-02-17	21:45:26.639363
44	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-02-17	21:45:33.903639	2025-02-17	21:45:33.903639
45	2	Login efetuado com sucesso!...	2025-02-18	16:55:56.255437	2025-02-18	16:55:56.255437
46	2	Login efetuado com sucesso!...	2025-02-23	16:13:56.371074	2025-02-23	16:13:56.371074
47	2	Login efetuado com sucesso!...	2025-02-23	16:16:30.232483	2025-02-23	16:16:30.232483
48	2	Pesquisou perfil utilizador: rica@ariga.com	2025-02-23	16:26:27.13255	2025-02-23	16:26:27.13255
49	2	perfil de utilizador: 2 alterarada com sucesso!...	2025-02-23	16:26:40.098496	2025-02-23	16:26:40.098496
50	2	Pesquisou perfil utilizador: rica@ariga.com	2025-02-23	16:26:48.118505	2025-02-23	16:26:48.118505
51	2	perfil de utilizador: 2 alterarada com sucesso!...	2025-02-23	16:27:02.103946	2025-02-23	16:27:02.103946
52	2	Pesquisou perfil utilizador: rica@ariga.com	2025-02-23	16:27:12.517464	2025-02-23	16:27:12.517464
53	2	Pesquisou utilizador: rica@ariga.com	2025-02-23	16:27:32.090125	2025-02-23	16:27:32.090125
54	2	Pesquisou autenticação: rica@ariga.com	2025-02-23	16:28:22.86811	2025-02-23	16:28:22.86811
55	2	Login efetuado com sucesso!...	2025-02-24	17:23:36.826219	2025-02-24	17:23:36.826219
56	2	Pesquisou na tabcoddesc com código de tabela: AN	2025-02-24	18:02:11.659358	2025-02-24	18:02:11.659358
57	2	Pesquisou na tabcoddesc com código de tabela: STA	2025-02-24	18:02:35.913153	2025-02-24	18:02:35.913153
58	2	Login efetuado com sucesso!...	2025-03-02	10:11:22.331424	2025-03-02	10:11:22.331424
59	2	Login efetuado com sucesso!...	2025-03-02	17:39:35.729022	2025-03-02	17:39:35.729022
60	2	Login efetuado com sucesso!...	2025-03-02	17:40:53.276267	2025-03-02	17:40:53.276267
61	2	Login efetuado com sucesso!...	2025-03-03	16:53:53.673606	2025-03-03	16:53:53.673606
62	2	Login efetuado com sucesso!...	2025-03-11	17:54:23.474093	2025-03-11	17:54:23.474093
63	2	Login efetuado com sucesso!...	2025-03-11	18:14:49.29513	2025-03-11	18:14:49.29513
64	2	Login efetuado com sucesso!...	2025-04-24	21:13:54.485847	2025-04-24	21:13:54.485847
65	2	Login efetuado com sucesso!...	2025-04-25	21:35:12.074513	2025-04-25	21:35:12.074513
66	2	Pesquisou na tabcoddesc com código de tabela: PMY	2025-04-25	21:47:59.666153	2025-04-25	21:47:59.666153
67	2	Pesquisou perfil utilizador: rica@ariga.com	2025-04-25	21:48:41.637257	2025-04-25	21:48:41.637257
68	2	Pesquisou utilizador: rica@ariga.com	2025-04-25	21:49:15.614772	2025-04-25	21:49:15.614772
69	2	Pesquisou autenticação: rica@ariga.com	2025-04-25	21:49:39.034235	2025-04-25	21:49:39.034235
70	2	Login efetuado com sucesso!...	2025-04-25	22:22:59.860683	2025-04-25	22:22:59.860683
71	2	Pesquisou utilizador: rica@ariga.com	2025-04-25	22:33:08.567628	2025-04-25	22:33:08.567628
72	2	Pesquisou perfil utilizador: rica@ariga.com	2025-04-25	22:34:25.34963	2025-04-25	22:34:25.34963
73	2	Pesquisou autenticação: rica@ariga.com	2025-04-25	22:35:14.177293	2025-04-25	22:35:14.177293
74	2	Pesquisou na tabcoddesc com código de tabela: PMY	2025-04-25	22:45:52.182864	2025-04-25	22:45:52.182864
75	2	Pesquisou na tabcoddesc com código de tabela: STA	2025-04-25	22:49:49.796241	2025-04-25	22:49:49.796241
76	2	Pesquisou perfil utilizador: rica@ariga.com	2025-04-25	22:51:53.779893	2025-04-25	22:51:53.779893
77	2	Pesquisou utilizador: rica@ariga.com	2025-04-25	22:53:24.442909	2025-04-25	22:53:24.442909
78	2	Login efetuado com sucesso!...	2025-04-25	23:59:24.727167	2025-04-25	23:59:24.727167
79	2	Login efetuado com sucesso!...	2025-04-26	00:00:09.358226	2025-04-26	00:00:09.358226
80	2	Pesquisou autenticação: rica@ariga.com	2025-04-26	00:00:48.665745	2025-04-26	00:00:48.665745
81	2	Login efetuado com sucesso!...	2025-04-26	22:26:11.936852	2025-04-26	22:26:11.936852
82	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-04-26	22:28:00.674948	2025-04-26	22:28:00.674948
83	2	Entrada na tabela : 21 alterarado com sucesso!...	2025-04-26	22:28:19.116685	2025-04-26	22:28:19.116685
84	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-04-26	22:28:23.946607	2025-04-26	22:28:23.946607
85	2	Entrada na tabela : 21 alterarado com sucesso!...	2025-04-26	22:28:51.808421	2025-04-26	22:28:51.808421
86	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-04-26	22:28:55.813139	2025-04-26	22:28:55.813139
87	2	Pesquisou perfil utilizador: rica@ariga.com	2025-04-26	22:29:20.677226	2025-04-26	22:29:20.677226
88	2	Pesquisou utilizador: rica@ariga.com	2025-04-26	22:29:49.74189	2025-04-26	22:29:49.74189
89	2	Pesquisou autenticação: rica@ariga.com	2025-04-26	22:30:06.089426	2025-04-26	22:30:06.089426
90	2	Pesquisou na tabcoddesc com código de tabela: TB	2025-04-26	22:30:28.085699	2025-04-26	22:30:28.085699
91	2	Login efetuado com sucesso!...	2025-04-26	22:33:00.486986	2025-04-26	22:33:00.486986
92	2	Pesquisou na tabcoddesc com código de tabela: AN	2025-04-26	22:34:10.737574	2025-04-26	22:34:10.737574
93	2	Pesquisou perfil utilizador: rica@ariga.com	2025-04-26	22:34:41.487621	2025-04-26	22:34:41.487621
94	2	Pesquisou utilizador: rica@ariga.com	2025-04-26	22:34:53.115035	2025-04-26	22:34:53.115035
95	2	Pesquisou autenticação: rica@ariga.com	2025-04-26	22:35:18.906254	2025-04-26	22:35:18.906254
96	2	Login efetuado com sucesso!...	2025-05-07	19:08:59.356748	2025-05-07	19:08:59.356748
97	2	configuration: Architecture 1 alterada com sucesso!...	2025-05-07	19:11:02.565571	2025-05-07	19:11:02.565571
98	2	arinc653module: scenario alterada com sucesso!...	2025-05-07	19:11:02.59835	2025-05-07	19:11:02.59835
99	2	airconfiguration: 1 alterada com sucesso!...	2025-05-07	19:11:02.604525	2025-05-07	19:11:02.604525
100	2	partitions: p0 alterada com sucesso!...	2025-05-07	19:11:02.655761	2025-05-07	19:11:02.655761
101	2	partitions: p1 alterada com sucesso!...	2025-05-07	19:11:02.660773	2025-05-07	19:11:02.660773
102	2	partitionconfiguration: 1 alterada com sucesso!...	2025-05-07	19:11:02.661699	2025-05-07	19:11:02.661699
103	2	partitionconfiguration: 2 alterada com sucesso!...	2025-05-07	19:11:02.674398	2025-05-07	19:11:02.674398
104	2	memory: 1 alterada com sucesso!...	2025-05-07	19:11:02.675093	2025-05-07	19:11:02.675093
105	2	memory: 2 alterada com sucesso!...	2025-05-07	19:11:02.685288	2025-05-07	19:11:02.685288
106	2	moduleschedule: 1 alterada com sucesso!...	2025-05-07	19:11:02.686363	2025-05-07	19:11:02.686363
107	2	partitionschedule: 2 alterada com sucesso!...	2025-05-07	19:11:02.710715	2025-05-07	19:11:02.710715
108	2	partitionschedule: 3 alterada com sucesso!...	2025-05-07	19:11:02.722422	2025-05-07	19:11:02.722422
109	2	windowconfiguration: 4 alterada com sucesso!...	2025-05-07	19:11:02.723582	2025-05-07	19:11:02.723582
110	2	windowconfiguration: 5 alterada com sucesso!...	2025-05-07	19:11:02.736079	2025-05-07	19:11:02.736079
111	2	windowschedule: 2 alterada com sucesso!...	2025-05-07	19:11:02.737206	2025-05-07	19:11:02.737206
112	2	windowschedule: 3 alterada com sucesso!...	2025-05-07	19:11:02.751105	2025-05-07	19:11:02.751105
113	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-05-07	19:11:21.09057	2025-05-07	19:11:21.09057
114	2	Entrada na tabela : 23 alterarado com sucesso!...	2025-05-07	19:11:38.027025	2025-05-07	19:11:38.027025
115	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-05-07	19:11:46.716993	2025-05-07	19:11:46.716993
116	2	Entrada na tabela : 23 alterarado com sucesso!...	2025-05-07	19:12:17.669366	2025-05-07	19:12:17.669366
117	2	Pesquisou perfil utilizador: rica@ariga.com	2025-05-07	19:12:53.51411	2025-05-07	19:12:53.51411
118	2	Pesquisou utilizador: rica@ariga.com	2025-05-07	19:13:33.403895	2025-05-07	19:13:33.403895
119	2	Pesquisou autenticação: rica@ariga.com	2025-05-07	19:14:06.548314	2025-05-07	19:14:06.548314
120	2	Login efetuado com sucesso!...	2025-05-13	17:40:45.435543	2025-05-13	17:40:45.435543
121	2	Login efetuado com sucesso!...	2025-06-19	15:17:36.498242	2025-06-19	15:17:36.498242
122	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:27:12.110262	2025-06-19	15:27:12.110262
123	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:27:12.121994	2025-06-19	15:27:12.121994
124	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:27:14.668332	2025-06-19	15:27:14.668332
125	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:27:14.681003	2025-06-19	15:27:14.681003
126	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:27:24.734008	2025-06-19	15:27:24.734008
127	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:27:24.745735	2025-06-19	15:27:24.745735
128	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:27:41.751428	2025-06-19	15:27:41.751428
129	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:27:41.764183	2025-06-19	15:27:41.764183
130	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:29:56.378806	2025-06-19	15:29:56.378806
131	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:29:56.391549	2025-06-19	15:29:56.391549
132	2	windowschedule: 2 alterada com sucesso!...	2025-06-19	15:29:56.396159	2025-06-19	15:29:56.396159
133	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:30:04.503722	2025-06-19	15:30:04.503722
134	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:30:04.518671	2025-06-19	15:30:04.518671
135	2	windowschedule: 2 alterada com sucesso!...	2025-06-19	15:30:04.523441	2025-06-19	15:30:04.523441
136	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:32:17.973193	2025-06-19	15:32:17.973193
137	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:32:17.984711	2025-06-19	15:32:17.984711
138	2	partitionschedule: 3 alterada com sucesso!...	2025-06-19	15:32:17.987689	2025-06-19	15:32:17.987689
139	2	windowconfiguration: 5 alterada com sucesso!...	2025-06-19	15:32:17.988394	2025-06-19	15:32:17.988394
140	2	windowschedule: 2 alterada com sucesso!...	2025-06-19	15:32:17.990951	2025-06-19	15:32:17.990951
141	2	windowschedule: 3 alterada com sucesso!...	2025-06-19	15:32:17.994155	2025-06-19	15:32:17.994155
142	2	configuration: configuration2 criado com sucesso!...	2025-06-19	15:34:53.659201	2025-06-19	15:34:53.659201
143	2	configuration: Architecture 1 alterada com sucesso!...	2025-06-19	15:51:53.800267	2025-06-19	15:51:53.800267
144	2	arinc653module: scenario alterada com sucesso!...	2025-06-19	15:51:53.813886	2025-06-19	15:51:53.813886
145	2	airconfiguration: 1 alterada com sucesso!...	2025-06-19	15:51:53.817444	2025-06-19	15:51:53.817444
146	2	partitions: p0 alterada com sucesso!...	2025-06-19	15:51:53.821158	2025-06-19	15:51:53.821158
147	2	partitions: p1 alterada com sucesso!...	2025-06-19	15:51:53.826273	2025-06-19	15:51:53.826273
148	2	partitionconfiguration: 1 alterada com sucesso!...	2025-06-19	15:51:53.832688	2025-06-19	15:51:53.832688
149	2	partitionconfiguration: 2 alterada com sucesso!...	2025-06-19	15:51:53.838391	2025-06-19	15:51:53.838391
150	2	memory: 1 alterada com sucesso!...	2025-06-19	15:51:53.839731	2025-06-19	15:51:53.839731
151	2	memory: 2 alterada com sucesso!...	2025-06-19	15:51:53.845685	2025-06-19	15:51:53.845685
152	2	moduleschedule: 1 alterada com sucesso!...	2025-06-19	15:51:53.847196	2025-06-19	15:51:53.847196
153	2	partitionschedule: 2 alterada com sucesso!...	2025-06-19	15:51:53.852306	2025-06-19	15:51:53.852306
154	2	partitionschedule: 3 alterada com sucesso!...	2025-06-19	15:51:53.856738	2025-06-19	15:51:53.856738
155	2	windowconfiguration: 4 alterada com sucesso!...	2025-06-19	15:51:53.858121	2025-06-19	15:51:53.858121
156	2	windowconfiguration: 5 alterada com sucesso!...	2025-06-19	15:51:53.862593	2025-06-19	15:51:53.862593
157	2	windowschedule: 2 alterada com sucesso!...	2025-06-19	15:51:53.863858	2025-06-19	15:51:53.863858
158	2	windowschedule: 3 alterada com sucesso!...	2025-06-19	15:51:53.868137	2025-06-19	15:51:53.868137
159	2	Login efetuado com sucesso!...	2025-06-24	17:19:10.167861	2025-06-24	17:19:10.167861
160	2	Login efetuado com sucesso!...	2025-06-26	16:57:10.479475	2025-06-26	16:57:10.479475
161	2	partitions: p0 alterada com sucesso!...	2025-06-26	17:09:57.06259	2025-06-26	17:09:57.06259
162	2	partitionconfiguration: 1 alterada com sucesso!...	2025-06-26	17:09:57.090329	2025-06-26	17:09:57.090329
163	2	memory: 1 alterada com sucesso!...	2025-06-26	17:09:57.092835	2025-06-26	17:09:57.092835
164	2	Pesquisou na tabcoddesc com código de tabela: LIB	2025-06-26	17:16:35.579477	2025-06-26	17:16:35.579477
165	2	Pesquisou utilizador: rica@ariga.com	2025-06-26	17:19:45.928944	2025-06-26	17:19:45.928944
166	2	Login efetuado com sucesso!...	2025-06-27	10:26:30.715486	2025-06-27	10:26:30.715486
167	2	partitions: p1 alterada com sucesso!...	2025-06-27	10:28:34.670329	2025-06-27	10:28:34.670329
168	2	partitionconfiguration: 2 alterada com sucesso!...	2025-06-27	10:28:34.682997	2025-06-27	10:28:34.682997
169	2	memory: 2 alterada com sucesso!...	2025-06-27	10:28:34.685416	2025-06-27	10:28:34.685416
170	2	airconfiguration: 1 alterada com sucesso!...	2025-06-27	10:30:23.462107	2025-06-27	10:30:23.462107
171	2	configuration: arquitectura2 criado com sucesso!...	2025-06-27	10:52:28.978884	2025-06-27	10:52:28.978884
172	2	arinc653module: arquitectura 2 criado com sucesso!...	2025-06-27	10:53:31.525953	2025-06-27	10:53:31.525953
173	2	arinc653module: arquitectura 2 criado com sucesso!...	2025-06-27	10:54:58.811708	2025-06-27	10:54:58.811708
174	2	airconfiguration: 2 criado com sucesso!...	2025-06-27	10:54:58.824376	2025-06-27	10:54:58.824376
175	2	arinc653module: arquitectura 2 criado com sucesso!...	2025-06-27	10:55:11.816208	2025-06-27	10:55:11.816208
176	2	airconfiguration: 3 criado com sucesso!...	2025-06-27	10:55:11.826213	2025-06-27	10:55:11.826213
177	2	arinc653module: arquitectura 2 criado com sucesso!...	2025-06-27	10:55:33.508855	2025-06-27	10:55:33.508855
178	2	airconfiguration: 4 criado com sucesso!...	2025-06-27	10:55:33.520984	2025-06-27	10:55:33.520984
179	2	airconfiguration: 5 criado com sucesso!...	2025-06-27	11:23:54.130758	2025-06-27	11:23:54.130758
180	2	airconfiguration: 5 alterada com sucesso!...	2025-06-27	11:24:41.484912	2025-06-27	11:24:41.484912
181	2	moduleschedule: 2 criado com sucesso!...	2025-06-27	11:25:41.915735	2025-06-27	11:25:41.915735
182	2	partitions: p1 criado com sucesso!...	2025-06-27	11:28:14.267205	2025-06-27	11:28:14.267205
183	2	partitionconfiguration: 3 criado com sucesso!...	2025-06-27	11:28:14.295857	2025-06-27	11:28:14.295857
184	2	memory: 3 criado com sucesso!...	2025-06-27	11:28:14.304201	2025-06-27	11:28:14.304201
185	2	airconfiguration: 5 alterada com sucesso!...	2025-06-27	11:28:33.931877	2025-06-27	11:28:33.931877
186	2	partitions: p2 criado com sucesso!...	2025-06-27	11:29:52.017919	2025-06-27	11:29:52.017919
187	2	partitionconfiguration: 4 criado com sucesso!...	2025-06-27	11:29:52.029264	2025-06-27	11:29:52.029264
188	2	memory: 4 criado com sucesso!...	2025-06-27	11:29:52.031909	2025-06-27	11:29:52.031909
189	2	partitions: p3 criado com sucesso!...	2025-06-27	11:29:52.034644	2025-06-27	11:29:52.034644
190	2	partitionconfiguration: 5 criado com sucesso!...	2025-06-27	11:29:52.035534	2025-06-27	11:29:52.035534
191	2	memory: 5 criado com sucesso!...	2025-06-27	11:29:52.036298	2025-06-27	11:29:52.036298
192	2	partitions: p1 alterada com sucesso!...	2025-06-27	11:30:21.311878	2025-06-27	11:30:21.311878
193	2	partitionconfiguration: 3 alterada com sucesso!...	2025-06-27	11:30:21.323245	2025-06-27	11:30:21.323245
194	2	memory: 3 alterada com sucesso!...	2025-06-27	11:30:21.326319	2025-06-27	11:30:21.326319
195	2	partitionschedule: 4 criado com sucesso!...	2025-06-27	11:31:22.281368	2025-06-27	11:31:22.281368
196	2	windowconfiguration: 6 criado com sucesso!...	2025-06-27	11:31:22.295438	2025-06-27	11:31:22.295438
197	2	windowschedule: 4 criado com sucesso!...	2025-06-27	11:37:38.159148	2025-06-27	11:37:38.159148
198	2	windowschedule: 5 criado com sucesso!...	2025-06-27	11:37:38.189351	2025-06-27	11:37:38.189351
199	2	windowschedule: 6 criado com sucesso!...	2025-06-27	11:37:38.190906	2025-06-27	11:37:38.190906
200	2	windowschedule: 7 criado com sucesso!...	2025-06-27	11:37:38.192402	2025-06-27	11:37:38.192402
201	2	windowschedule: 8 criado com sucesso!...	2025-06-27	11:37:38.193848	2025-06-27	11:37:38.193848
202	2	windowschedule: 9 criado com sucesso!...	2025-06-27	11:37:38.195361	2025-06-27	11:37:38.195361
203	2	windowschedule: 5 alterada com sucesso!...	2025-06-27	11:38:56.790609	2025-06-27	11:38:56.790609
204	2	windowschedule: 7 alterada com sucesso!...	2025-06-27	11:38:56.807013	2025-06-27	11:38:56.807013
205	2	windowschedule: 8 alterada com sucesso!...	2025-06-27	11:38:56.808554	2025-06-27	11:38:56.808554
206	2	windowschedule: 4 alterada com sucesso!...	2025-06-27	11:56:32.359136	2025-06-27	11:56:32.359136
207	2	windowschedule: 6 alterada com sucesso!...	2025-06-27	11:56:32.372063	2025-06-27	11:56:32.372063
208	2	windowschedule: 9 alterada com sucesso!...	2025-06-27	11:56:32.374392	2025-06-27	11:56:32.374392
209	2	windowschedule: 5 alterada com sucesso!...	2025-06-27	11:56:32.376012	2025-06-27	11:56:32.376012
210	2	windowschedule: 8 alterada com sucesso!...	2025-06-27	11:56:32.377433	2025-06-27	11:56:32.377433
211	2	windowschedule: 7 alterada com sucesso!...	2025-06-27	11:57:07.474605	2025-06-27	11:57:07.474605
212	2	windowschedule: 9 alterada com sucesso!...	2025-06-27	11:57:07.489555	2025-06-27	11:57:07.489555
213	2	windowschedule: 8 alterada com sucesso!...	2025-06-27	11:57:26.728298	2025-06-27	11:57:26.728298
214	2	Login efetuado com sucesso!...	2025-06-27	12:46:13.539272	2025-06-27	12:46:13.539272
215	2	Login efetuado com sucesso!...	2025-07-13	18:34:38.838017	2025-07-13	18:34:38.838017
216	2	Login efetuado com sucesso!...	2025-07-13	21:45:45.373842	2025-07-13	21:45:45.373842
\.


--
-- TOC entry 3095 (class 0 OID 16945)
-- Dependencies: 213
-- Data for Name: autenticacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.autenticacao (id, idutilizador, pws, datacriacao, horacriacao, dataalteracao, horaalteracao, activo) FROM stdin;
1	1	1bbd886460827015e5d605ed44252251	2025-01-30	19:44:34.452973	2025-01-30	19:44:34.452973	S
2	2	1bbd886460827015e5d605ed44252251	2025-01-30	19:44:49.465927	2025-01-30	19:44:49.465927	S
\.


--
-- TOC entry 3103 (class 0 OID 17078)
-- Dependencies: 221
-- Data for Name: configuration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.configuration (id, archname, bare, iddebugmonitor, idfpu, installrtos, posixrtems5, rtems48i, rtems5, idtargetboard, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idarchitecturetype) FROM stdin;
2	configuration2	t	2	3	t	f	t	t	5	2025-06-19	2025-06-19	15:34:53.659201	15:34:53.659201	S	6
1	Architecture 1	f	2	3	t	f	f	f	5	2024-10-23	2025-06-19	22:14:33.819209	15:51:53.800267	S	6
3	arquitectura2	t	2	3	t	f	t	t	5	2025-06-27	2025-06-27	10:52:28.978884	10:52:28.978884	S	6
\.


--
-- TOC entry 3083 (class 0 OID 16460)
-- Dependencies: 201
-- Data for Name: generaltable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.generaltable (id, cod, codtable, "desc", desctable, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, tipo) FROM stdin;
1	01	DEV	(empty)	Devices	2024-10-22	2024-10-22	21:29:31.367717	21:29:31.367717	S	0
2	01	DM	GRMON	Debug Monitor	2024-10-23	2024-10-23	22:04:43.335018	22:04:43.335018	S	0
3	01	STA	Enabled	State	2024-10-23	2024-10-23	22:08:01.858295	22:08:01.858295	S	0
4	02	STA	Disabled	State	2024-10-23	2024-10-23	22:08:38.148046	22:08:38.148046	S	0
6	01	AN	ARM	ArchitectureType	2024-10-23	2024-10-23	22:12:58.949974	22:12:58.949974	S	0
7	01	CRY	LEVEL_A	Criticality	2024-10-23	2024-10-23	22:40:59.107136	22:40:59.107136	S	0
8	01	PER	RTEMS5	Personality	2024-10-23	2024-10-23	22:59:35.089821	22:59:35.089821	S	0
9	01	PMY	FPU_CONTROL	Permissions	2024-10-23	2024-10-23	23:06:15.379371	23:06:15.379371	S	0
10	02	PMY	GLOBAL_TIME	Permissions	2024-10-23	2024-10-23	23:06:43.915675	23:06:43.915675	S	0
11	03	PMY	CACHE_CONTROL	Permissions	2024-10-23	2024-10-23	23:07:13.209866	23:07:13.209866	S	0
12	04	PMY	SET_TOD	Permissions	2024-10-23	2024-10-23	23:07:48.026828	23:07:48.026828	S	0
13	05	PMY	SET_PARTITION_MODE	Permissions	2024-10-23	2024-10-23	23:08:35.122644	23:08:35.122644	S	0
14	01	LIB	LIBAIR	Libs	2024-10-23	2024-10-23	23:13:37.59985	23:13:37.59985	S	0
15	02	LIB	LIBPRINTF	Libs	2024-10-23	2024-10-23	23:14:06.957596	23:14:06.957596	S	0
16	UTI1	PU	Utilizador	Perfil utilizador	2025-01-30	2025-01-30	19:14:20.408522	19:14:20.408522	S	0
17	UTI2	PU	Utilizador avançado	Perfil utilizador	2025-01-30	2025-01-30	19:15:18.363517	19:15:18.363517	S	0
18	ADM	PU	Administrador	Perfil utilizador	2025-01-30	2025-01-30	19:16:48.075013	19:16:48.075013	S	0
19	ARI1	PU	Gestor nível I ARIGA	Perfil utilizador	2025-01-30	2025-01-30	19:18:00.267793	19:18:00.267793	S	0
20	ARI2	PU	Gestor nível II ARIGA	Perfil utilizador	2025-01-30	2025-01-30	19:18:30.987641	19:18:30.987641	S	0
5	01	TB	zynqz1	TargetBoard	2024-10-23	2025-02-17	22:11:24.507593	20:54:59.379512	S	0
22	04	LIB	ex132	Libs	2025-02-17	2025-02-17	21:42:21.83434	21:42:21.83434	S	0
21	03	LIB	ex123	Libs	2025-02-17	2025-04-26	21:37:47.507831	22:28:51.808421	S	0
23	04	LIB	ex143	Libs	2025-02-17	2025-05-07	21:45:26.639363	19:12:17.669366	S	0
\.


--
-- TOC entry 3079 (class 0 OID 16396)
-- Dependencies: 197
-- Data for Name: memory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.memory (id, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idpartitionconfiguration, size) FROM stdin;
1	2024-10-29	2025-06-26	20:49:19.613986	17:09:57.092835	S	1	0x100000
2	2024-10-29	2025-06-27	20:49:51.447388	10:28:34.685416	S	2	0x100000
4	2025-06-27	2025-06-27	11:29:52.031909	11:29:52.031909	S	4	0x000100
5	2025-06-27	2025-06-27	11:29:52.036298	11:29:52.036298	S	5	0x000100
3	2025-06-27	2025-06-27	11:28:14.304201	11:30:21.326319	S	3	0x000100
\.


--
-- TOC entry 3101 (class 0 OID 16990)
-- Dependencies: 219
-- Data for Name: moduleschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.moduleschedule (id, initialmoduleschedule, majorframeseconds, scheduleidentifier, schedulename, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idarinc653module) FROM stdin;
1	t	0.25000	1	schedule	2024-10-23	2025-06-19	22:24:17.336657	15:51:53.847196	S	1
2	f	1.00000	2	Modulo 2	2025-06-27	2025-06-27	11:25:41.915735	11:25:41.915735	S	2
\.


--
-- TOC entry 3080 (class 0 OID 16402)
-- Dependencies: 198
-- Data for Name: partitionconfiguration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partitionconfiguration (id, cache, cores, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idpartition, libs, personality, devices, permissions) FROM stdin;
1	CODE; DATA	2	2024-10-23	2025-06-26	23:16:20.476303	17:09:57.090329	S	1	14;15	8	1	9;10;11;12;13
2	CODE; DATA	2	2024-10-23	2025-06-27	23:16:46.638336	10:28:34.682997	S	2	14;15	8	1	9;10;11;12;13
4	NA	3	2025-06-27	2025-06-27	11:29:52.029264	11:29:52.029264	S	4	14	8	1	9
5	NA	3	2025-06-27	2025-06-27	11:29:52.035534	11:29:52.035534	S	5	14	8	1	9
3	NA	2	2025-06-27	2025-06-27	11:28:14.295857	11:30:21.323245	S	3	14	8	1	9
\.


--
-- TOC entry 3085 (class 0 OID 16688)
-- Dependencies: 203
-- Data for Name: partitions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partitions (id, criticality, partitionname, partitionidentifier, systempartition, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idarinc653module, entrypoint) FROM stdin;
1	7	p0	1	f	2024-10-23	2025-06-26	22:43:03.151719	17:09:57.06259	S	1	entrypoint
2	7	p1	2	f	2024-10-23	2025-06-27	22:46:39.536902	10:28:34.670329	S	1	entrypoint
4	7	p2	2	f	2025-06-27	2025-06-27	11:29:52.017919	11:29:52.017919	S	2	NA
5	7	p3	3	f	2025-06-27	2025-06-27	11:29:52.034644	11:29:52.034644	S	2	NA
3	7	p1	1	f	2025-06-27	2025-06-27	11:28:14.267205	11:30:21.311878	S	2	NA
\.


--
-- TOC entry 3091 (class 0 OID 16893)
-- Dependencies: 209
-- Data for Name: partitionschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partitionschedule (id, perioddurationseconds, periodseconds, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idmoduloschedule) FROM stdin;
2	0.25000	0.25000	2024-10-23	2025-06-19	22:25:43.789677	15:51:53.852306	S	1
3	0.25000	0.25000	2024-10-23	2025-06-19	22:26:33.494951	15:51:53.856738	S	1
4	1.00000	0.10000	2025-06-27	2025-06-27	11:31:22.281368	11:31:22.281368	S	2
\.


--
-- TOC entry 3097 (class 0 OID 16962)
-- Dependencies: 215
-- Data for Name: sessao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessao (id, idautenticacao, datacriacao, horacriacao, dataalteracao, horaalteracao) FROM stdin;
1	2	2025-01-30	20:18:21.51778	2025-01-30	20:18:21.51778
2	2	2025-02-05	17:06:52.252524	2025-02-05	17:06:52.252524
3	2	2025-02-05	17:35:57.643819	2025-02-05	17:35:57.643819
4	2	2025-02-07	18:48:06.318373	2025-02-07	18:48:06.318373
5	2	2025-02-07	18:50:00.685037	2025-02-07	18:50:00.685037
6	2	2025-02-07	19:17:46.965248	2025-02-07	19:17:46.965248
7	2	2025-02-09	16:10:22.943937	2025-02-09	16:10:22.943937
8	2	2025-02-09	16:41:27.414654	2025-02-09	16:41:27.414654
9	2	2025-02-09	16:54:23.548283	2025-02-09	16:54:23.548283
10	2	2025-02-09	18:35:27.880051	2025-02-09	18:35:27.880051
11	2	2025-02-15	15:43:52.192201	2025-02-15	15:43:52.192201
12	2	2025-02-15	18:02:25.407165	2025-02-15	18:02:25.407165
13	2	2025-02-15	18:53:52.753743	2025-02-15	18:53:52.753743
14	2	2025-02-15	18:59:36.877865	2025-02-15	18:59:36.877865
15	2	2025-02-16	14:09:44.266024	2025-02-16	14:09:44.266024
16	2	2025-02-16	15:11:30.175167	2025-02-16	15:11:30.175167
17	2	2025-02-16	16:20:47.955247	2025-02-16	16:20:47.955247
18	2	2025-02-17	20:06:03.061198	2025-02-17	20:06:03.061198
19	2	2025-02-17	21:28:33.972343	2025-02-17	21:28:33.972343
20	2	2025-02-18	16:55:56.255437	2025-02-18	16:55:56.255437
21	2	2025-02-23	16:13:56.371074	2025-02-23	16:13:56.371074
22	2	2025-02-23	16:16:30.232483	2025-02-23	16:16:30.232483
23	2	2025-02-24	17:23:36.826219	2025-02-24	17:23:36.826219
24	2	2025-03-02	10:11:22.331424	2025-03-02	10:11:22.331424
25	2	2025-03-02	17:39:35.729022	2025-03-02	17:39:35.729022
26	2	2025-03-02	17:40:53.276267	2025-03-02	17:40:53.276267
27	2	2025-03-03	16:53:53.673606	2025-03-03	16:53:53.673606
28	2	2025-03-11	17:54:23.474093	2025-03-11	17:54:23.474093
29	2	2025-03-11	18:14:49.29513	2025-03-11	18:14:49.29513
30	2	2025-04-24	21:13:54.485847	2025-04-24	21:13:54.485847
31	2	2025-04-25	21:35:12.074513	2025-04-25	21:35:12.074513
32	2	2025-04-25	22:22:59.860683	2025-04-25	22:22:59.860683
33	2	2025-04-25	23:59:24.727167	2025-04-25	23:59:24.727167
34	2	2025-04-26	00:00:09.358226	2025-04-26	00:00:09.358226
35	2	2025-04-26	22:26:11.936852	2025-04-26	22:26:11.936852
36	2	2025-04-26	22:33:00.486986	2025-04-26	22:33:00.486986
37	2	2025-05-07	19:08:59.356748	2025-05-07	19:08:59.356748
38	2	2025-05-13	17:40:45.435543	2025-05-13	17:40:45.435543
39	2	2025-06-19	15:17:36.498242	2025-06-19	15:17:36.498242
40	2	2025-06-24	17:19:10.167861	2025-06-24	17:19:10.167861
41	2	2025-06-26	16:57:10.479475	2025-06-26	16:57:10.479475
42	2	2025-06-27	10:26:30.715486	2025-06-27	10:26:30.715486
43	2	2025-06-27	12:46:13.539272	2025-06-27	12:46:13.539272
44	2	2025-07-13	18:34:38.838017	2025-07-13	18:34:38.838017
45	2	2025-07-13	21:45:45.373842	2025-07-13	21:45:45.373842
\.


--
-- TOC entry 3093 (class 0 OID 16925)
-- Dependencies: 211
-- Data for Name: utilizador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilizador (id, nome, datacriacao, horacriacao, dataalteracao, horaalteracao, email, activo, idperfilutilizador) FROM stdin;
1	Admin	2025-01-30	19:19:08.943236	2025-01-30	19:19:08.943236	admin@ariga.com	S	18
2	Ricardo Lopes	2025-01-30	19:42:15.548979	2025-02-23	16:27:02.103946	rica@ariga.com	S	18
\.


--
-- TOC entry 3088 (class 0 OID 16861)
-- Dependencies: 206
-- Data for Name: windowconfiguration; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.windowconfiguration (id, windowidentifier, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, cores, idpartitionschedule) FROM stdin;
4	1	2024-10-23	2025-06-19	22:31:03.240289	15:51:53.858121	S	1	2
5	1	2024-10-23	2025-06-19	22:36:04.062918	15:51:53.862593	S	1	3
6	1	2025-06-27	2025-06-27	11:31:22.295438	11:31:22.295438	S	4	4
\.


--
-- TOC entry 3087 (class 0 OID 16800)
-- Dependencies: 205
-- Data for Name: windowschedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.windowschedule (id, partitionperiodstart, windowdurationseconds, windowidentifier, windowstartseconds, datacriacao, dataalteracao, horacriacao, horaalteracao, activo, idpartitionschedule, idpartitionconfiguration, coreidentifier) FROM stdin;
2	t	0.25000	1	0.00000	2024-10-23	2025-06-19	22:34:08.091591	15:51:53.863858	S	2	1	1
3	t	0.25000	1	0.00000	2024-10-23	2025-06-19	22:36:45.714582	15:51:53.868137	S	3	2	1
4	t	0.10000	1	0.30000	2025-06-27	2025-06-27	11:37:38.159148	11:56:32.359136	S	4	3	1
6	f	0.20000	3	0.30000	2025-06-27	2025-06-27	11:37:38.190906	11:56:32.372063	S	4	5	2
5	f	0.20000	2	0.10000	2025-06-27	2025-06-27	11:37:38.189351	11:56:32.376012	S	4	4	1
7	f	0.20000	4	0.80000	2025-06-27	2025-06-27	11:37:38.192402	11:57:07.474605	S	4	5	3
9	f	0.20000	6	0.00000	2025-06-27	2025-06-27	11:37:38.195361	11:57:07.489555	S	4	3	3
8	t	0.20000	5	0.00000	2025-06-27	2025-06-27	11:37:38.193848	11:57:26.728298	S	4	4	4
\.


--
-- TOC entry 3118 (class 0 OID 0)
-- Dependencies: 216
-- Name: AIRConfiguration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."AIRConfiguration_id_seq"', 5, true);


--
-- TOC entry 3119 (class 0 OID 0)
-- Dependencies: 199
-- Name: PartitionConfiguration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PartitionConfiguration_id_seq"', 5, true);


--
-- TOC entry 3120 (class 0 OID 0)
-- Dependencies: 204
-- Name: WindowScheduleElement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."WindowScheduleElement_id_seq"', 9, true);


--
-- TOC entry 3121 (class 0 OID 0)
-- Dependencies: 223
-- Name: arinc653module_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.arinc653module_id_seq', 5, true);


--
-- TOC entry 3122 (class 0 OID 0)
-- Dependencies: 224
-- Name: auditoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auditoria_id_seq', 216, true);


--
-- TOC entry 3123 (class 0 OID 0)
-- Dependencies: 212
-- Name: autenticacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.autenticacao_id_seq', 2, true);


--
-- TOC entry 3124 (class 0 OID 0)
-- Dependencies: 222
-- Name: configuration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.configuration_id_seq', 3, true);


--
-- TOC entry 3125 (class 0 OID 0)
-- Dependencies: 200
-- Name: generaltable_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.generaltable_id_seq', 23, true);


--
-- TOC entry 3126 (class 0 OID 0)
-- Dependencies: 196
-- Name: memory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.memory_id_seq', 5, true);


--
-- TOC entry 3127 (class 0 OID 0)
-- Dependencies: 218
-- Name: moduleschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.moduleschedule_id_seq', 2, true);


--
-- TOC entry 3128 (class 0 OID 0)
-- Dependencies: 202
-- Name: partitions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partitions_id_seq', 5, true);


--
-- TOC entry 3129 (class 0 OID 0)
-- Dependencies: 208
-- Name: partitionschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partitionschedule_id_seq', 4, true);


--
-- TOC entry 3130 (class 0 OID 0)
-- Dependencies: 214
-- Name: sessao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessao_id_seq', 45, true);


--
-- TOC entry 3131 (class 0 OID 0)
-- Dependencies: 210
-- Name: utilizador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilizador_id_seq', 2, true);


--
-- TOC entry 3132 (class 0 OID 0)
-- Dependencies: 207
-- Name: windowconfigurationelement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.windowconfigurationelement_id_seq', 6, true);


--
-- TOC entry 2929 (class 2606 OID 16987)
-- Name: airconfiguration AIRConfiguration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airconfiguration
    ADD CONSTRAINT "AIRConfiguration_pkey" PRIMARY KEY (id);


--
-- TOC entry 2937 (class 2606 OID 17429)
-- Name: auditoria Idauditoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT "Idauditoria_pkey" PRIMARY KEY (id);


--
-- TOC entry 2911 (class 2606 OID 16406)
-- Name: partitionconfiguration PartitionConfiguration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitionconfiguration
    ADD CONSTRAINT "PartitionConfiguration_pkey" PRIMARY KEY (id);


--
-- TOC entry 2917 (class 2606 OID 16804)
-- Name: windowschedule WindowScheduleElement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.windowschedule
    ADD CONSTRAINT "WindowScheduleElement_pkey" PRIMARY KEY (id);


--
-- TOC entry 2933 (class 2606 OID 17050)
-- Name: arinc653module arinc653_module_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arinc653module
    ADD CONSTRAINT arinc653_module_pkey PRIMARY KEY (id);


--
-- TOC entry 2935 (class 2606 OID 17093)
-- Name: configuration configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT configuration_pkey PRIMARY KEY (id);


--
-- TOC entry 2913 (class 2606 OID 16464)
-- Name: generaltable generaltable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.generaltable
    ADD CONSTRAINT generaltable_pkey PRIMARY KEY (id);


--
-- TOC entry 2925 (class 2606 OID 16954)
-- Name: autenticacao idautenticacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.autenticacao
    ADD CONSTRAINT idautenticacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 16970)
-- Name: sessao idsessao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessao
    ADD CONSTRAINT idsessao_pkey PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 16936)
-- Name: utilizador idutilizador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilizador
    ADD CONSTRAINT idutilizador_pkey PRIMARY KEY (id);


--
-- TOC entry 2909 (class 2606 OID 16414)
-- Name: memory memory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memory
    ADD CONSTRAINT memory_pkey PRIMARY KEY (id);


--
-- TOC entry 2931 (class 2606 OID 16994)
-- Name: moduleschedule moduleschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moduleschedule
    ADD CONSTRAINT moduleschedule_pkey PRIMARY KEY (id);


--
-- TOC entry 2915 (class 2606 OID 16692)
-- Name: partitions partitions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitions
    ADD CONSTRAINT partitions_pkey PRIMARY KEY (id);


--
-- TOC entry 2921 (class 2606 OID 16897)
-- Name: partitionschedule partitionschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitionschedule
    ADD CONSTRAINT partitionschedule_pkey PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 16890)
-- Name: windowconfiguration windowconfigurationelement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.windowconfiguration
    ADD CONSTRAINT windowconfigurationelement_pkey PRIMARY KEY (id);


--
-- TOC entry 2955 (class 2606 OID 17114)
-- Name: configuration idarchitecturetype_id_architecturetype_tkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT idarchitecturetype_id_architecturetype_tkey FOREIGN KEY (idarchitecturetype) REFERENCES public.generaltable(id) NOT VALID;


--
-- TOC entry 2950 (class 2606 OID 17154)
-- Name: moduleschedule idarinc653module_id_arinc653module_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.moduleschedule
    ADD CONSTRAINT idarinc653module_id_arinc653module_fkey FOREIGN KEY (idarinc653module) REFERENCES public.arinc653module(id) NOT VALID;


--
-- TOC entry 2949 (class 2606 OID 17159)
-- Name: airconfiguration idarinc653module_id_arinc653module_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airconfiguration
    ADD CONSTRAINT idarinc653module_id_arinc653module_fkey FOREIGN KEY (idarinc653module) REFERENCES public.arinc653module(id) NOT VALID;


--
-- TOC entry 2940 (class 2606 OID 17164)
-- Name: partitions idarinc653module_id_arinc653module_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitions
    ADD CONSTRAINT idarinc653module_id_arinc653module_fkey FOREIGN KEY (idarinc653module) REFERENCES public.arinc653module(id) NOT VALID;


--
-- TOC entry 2956 (class 2606 OID 17430)
-- Name: auditoria idautenticacao_Id_sigi_autenticacao_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auditoria
    ADD CONSTRAINT "idautenticacao_Id_sigi_autenticacao_fkey" FOREIGN KEY (idautenticacao) REFERENCES public.autenticacao(id);


--
-- TOC entry 2948 (class 2606 OID 16971)
-- Name: sessao idautenticacao_id_autenticacao_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessao
    ADD CONSTRAINT idautenticacao_id_autenticacao_fkey FOREIGN KEY (idautenticacao) REFERENCES public.autenticacao(id);


--
-- TOC entry 2951 (class 2606 OID 17519)
-- Name: arinc653module idconfiguration_id_configuration_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.arinc653module
    ADD CONSTRAINT idconfiguration_id_configuration_fkey FOREIGN KEY (idconfiguration) REFERENCES public.configuration(id) NOT VALID;


--
-- TOC entry 2941 (class 2606 OID 17203)
-- Name: partitions idcriticality_id_generaltable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitions
    ADD CONSTRAINT idcriticality_id_generaltable_fkey FOREIGN KEY (criticality) REFERENCES public.generaltable(id) NOT VALID;


--
-- TOC entry 2952 (class 2606 OID 17099)
-- Name: configuration iddebugmonitor_id_generaltable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT iddebugmonitor_id_generaltable_fkey FOREIGN KEY (iddebugmonitor) REFERENCES public.generaltable(id);


--
-- TOC entry 2953 (class 2606 OID 17104)
-- Name: configuration idfpu_id_fpu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT idfpu_id_fpu_fkey FOREIGN KEY (idfpu) REFERENCES public.generaltable(id);


--
-- TOC entry 2945 (class 2606 OID 17184)
-- Name: partitionschedule idmoduloschedule_id_moduloschedule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitionschedule
    ADD CONSTRAINT idmoduloschedule_id_moduloschedule_fkey FOREIGN KEY (idmoduloschedule) REFERENCES public.moduleschedule(id) NOT VALID;


--
-- TOC entry 2939 (class 2606 OID 17534)
-- Name: partitionconfiguration idpartition_id_partition_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partitionconfiguration
    ADD CONSTRAINT idpartition_id_partition_fkey FOREIGN KEY (idpartition) REFERENCES public.partitions(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2938 (class 2606 OID 17529)
-- Name: memory idpartitionconfiguration_id_partitionconfiguration_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.memory
    ADD CONSTRAINT idpartitionconfiguration_id_partitionconfiguration_fkey FOREIGN KEY (idpartitionconfiguration) REFERENCES public.partitionconfiguration(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2942 (class 2606 OID 17549)
-- Name: windowschedule idpartitionconfiguration_id_partitionconfiguration_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.windowschedule
    ADD CONSTRAINT idpartitionconfiguration_id_partitionconfiguration_fkey FOREIGN KEY (idpartitionconfiguration) REFERENCES public.partitionconfiguration(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2944 (class 2606 OID 17539)
-- Name: windowconfiguration idpartitionschedule_id_partitionschedule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.windowconfiguration
    ADD CONSTRAINT idpartitionschedule_id_partitionschedule_fkey FOREIGN KEY (idpartitionschedule) REFERENCES public.partitionschedule(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 2943 (class 2606 OID 17554)
-- Name: windowschedule idpartitionschedule_id_partitionschedule_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.windowschedule
    ADD CONSTRAINT idpartitionschedule_id_partitionschedule_fkey FOREIGN KEY (idpartitionschedule) REFERENCES public.partitionschedule(id) NOT VALID;


--
-- TOC entry 2946 (class 2606 OID 16937)
-- Name: utilizador idperfilutilizador_id_generaltable_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilizador
    ADD CONSTRAINT idperfilutilizador_id_generaltable_fkey FOREIGN KEY (idperfilutilizador) REFERENCES public.generaltable(id);


--
-- TOC entry 2954 (class 2606 OID 17109)
-- Name: configuration idtargetboard_id_targetboard_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT idtargetboard_id_targetboard_fkey FOREIGN KEY (idtargetboard) REFERENCES public.generaltable(id);


--
-- TOC entry 2947 (class 2606 OID 16955)
-- Name: autenticacao idutilizador_id_utilizador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.autenticacao
    ADD CONSTRAINT idutilizador_id_utilizador_fkey FOREIGN KEY (idutilizador) REFERENCES public.utilizador(id);


-- Completed on 2025-07-13 22:03:57

--
-- PostgreSQL database dump complete
--

