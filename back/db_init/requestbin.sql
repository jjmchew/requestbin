--
-- PostgreSQL database dump
--

-- Dumped from database version 14.11 (Postgres.app)
-- Dumped by pg_dump version 14.11 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bins; Type: TABLE; Schema: public; Owner: yglim
--

CREATE TABLE public.bins (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.bins OWNER TO yglim;

--
-- Name: bins_id_seq; Type: SEQUENCE; Schema: public; Owner: yglim
--

ALTER TABLE public.bins ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.bins_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: requests; Type: TABLE; Schema: public; Owner: yglim
--

CREATE TABLE public.requests (
    id integer NOT NULL,
    bin_id integer NOT NULL,
    method character varying(7) NOT NULL,
    path character varying(100) NOT NULL,
    datetime_received timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL,
    hash character varying(15) NOT NULL
);


ALTER TABLE public.requests OWNER TO yglim;

--
-- Name: requests_id_seq; Type: SEQUENCE; Schema: public; Owner: yglim
--

ALTER TABLE public.requests ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: bins; Type: TABLE DATA; Schema: public; Owner: yglim
--

COPY public.bins (id, name) FROM stdin;
1	boinay
2	test
3	2YuzC5Jxd3b7auljL9tO
4	ksam29bVouSAJCAYFOJS
\.


--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: yglim
--

COPY public.requests (id, bin_id, method, path, datetime_received, hash) FROM stdin;
66	1	GET	/boinay	2024-05-30 23:17:43.73751	1vpicfx8rj
67	1	GET	/boinay	2024-05-30 23:17:53.788521	oO1BiFACty
68	1	GET	/boinay	2024-05-30 23:17:54.291034	aKwZPOQwY0
69	1	GET	/boinay	2024-05-30 23:17:54.787178	WVBrNRElF5
70	1	GET	/boinay	2024-05-30 23:17:55.283766	nXP8SWYo30
71	1	GET	/boinay	2024-05-30 23:17:55.752985	tymiDd3fgU
72	1	GET	/boinay	2024-05-30 23:17:56.20612	EwF1Crv5Xw
73	1	GET	/boinay	2024-05-30 23:17:56.752958	e6kSTIF6lq
74	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:21:53.771524	Nc5cKEXh0k
75	4	POST	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:20.11003	8BTr4HRF1g
76	4	POST	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:25.996251	1G1xfdwCMd
77	4	POST	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:27.255808	ggxbr09Q3w
78	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:33.143754	DxQoRWSMqg
79	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:34.559419	KZuGwHRwNw
80	4	PUT	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:46.496572	I41tgIFPzE
81	4	PUT	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:22:48.162967	xsLM9HfR3j
82	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:33:29.161567	8cZ0sLKfee
83	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:33:41.230245	5ixt64RwQs
84	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:33:53.838977	bvhOMyDPvB
85	4	GET	/ksam29bVouSAJCAYFOJS/	2024-05-30 23:34:54.201372	6QFCWLeZbZ
\.


--
-- Name: bins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yglim
--

SELECT pg_catalog.setval('public.bins_id_seq', 4, true);


--
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yglim
--

SELECT pg_catalog.setval('public.requests_id_seq', 85, true);


--
-- Name: bins bins_name_key; Type: CONSTRAINT; Schema: public; Owner: yglim
--

ALTER TABLE ONLY public.bins
    ADD CONSTRAINT bins_name_key UNIQUE (name);


--
-- Name: bins bins_pkey; Type: CONSTRAINT; Schema: public; Owner: yglim
--

ALTER TABLE ONLY public.bins
    ADD CONSTRAINT bins_pkey PRIMARY KEY (id);


--
-- Name: requests requests_hash_key; Type: CONSTRAINT; Schema: public; Owner: yglim
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_hash_key UNIQUE (hash);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: yglim
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: requests requests_bin_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: yglim
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_bin_id_fkey FOREIGN KEY (bin_id) REFERENCES public.bins(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

