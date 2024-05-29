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
    datetime_received timestamp without time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL
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
\.


--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: yglim
--

COPY public.requests (id, bin_id, method, path, datetime_received) FROM stdin;
3	1	GET	/testing/this/path	2024-05-28 22:27:50.979931
4	1	GET	/boinay	2024-05-28 22:35:53.050958
5	1	GET	/boinay	2024-05-28 22:36:57.824062
6	1	GET	/boinay	2024-05-28 22:37:24.862956
7	1	GET	/boinay	2024-05-28 22:38:51.744419
8	1	GET	/boinay	2024-05-28 22:39:13.805254
9	1	GET	/boinay	2024-05-28 22:39:22.324596
10	1	GET	/boinay	2024-05-28 22:39:23.50123
11	1	GET	/boinay	2024-05-28 22:39:39.587135
12	1	GET	/boinay	2024-05-28 22:40:16.888467
13	1	GET	/boinay	2024-05-28 22:40:28.217757
14	1	GET	/boinay	2024-05-28 22:40:37.716583
15	1	GET	/boinay	2024-05-28 22:42:48.945689
16	1	GET	/boinay	2024-05-28 22:42:51.624857
17	1	GET	/boinay	2024-05-28 22:43:15.918271
18	1	GET	/boinay	2024-05-28 22:43:17.332105
19	1	GET	/boinay	2024-05-28 22:43:18.068341
20	1	GET	/boinay	2024-05-28 23:40:59.944502
21	1	GET	/boinay	2024-05-28 23:41:14.243461
22	1	GET	/boinay	2024-05-28 23:41:15.162859
\.


--
-- Name: bins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yglim
--

SELECT pg_catalog.setval('public.bins_id_seq', 1, true);


--
-- Name: requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: yglim
--

SELECT pg_catalog.setval('public.requests_id_seq', 22, true);


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

