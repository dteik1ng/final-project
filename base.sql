PGDMP                      |            Barrelglow_db    16.1    16.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            	           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    80703    Barrelglow_db    DATABASE     �   CREATE DATABASE "Barrelglow_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE "Barrelglow_db";
                postgres    false            �            1259    80745 
   Categorias    TABLE     j   CREATE TABLE public."Categorias" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL
);
     DROP TABLE public."Categorias";
       public         heap    postgres    false            �            1259    80744    Categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Categorias_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."Categorias_id_seq";
       public          postgres    false    219                       0    0    Categorias_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Categorias_id_seq" OWNED BY public."Categorias".id;
          public          postgres    false    218            �            1259    80758 	   Productos    TABLE     �  CREATE TABLE public."Productos" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    descripcion text,
    precio double precision NOT NULL,
    "cantidadEntrada" integer NOT NULL,
    cantidad integer NOT NULL,
    "fechaEntrada" timestamp with time zone NOT NULL,
    "fechaVencimiento" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "CategoriaId" integer,
    "ProveedorId" integer
);
    DROP TABLE public."Productos";
       public         heap    postgres    false            �            1259    80751    Proveedores    TABLE     �   CREATE TABLE public."Proveedores" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    telefono character varying(255),
    celular character varying(255) NOT NULL
);
 !   DROP TABLE public."Proveedores";
       public         heap    postgres    false            �            1259    80705    Roles    TABLE     h   CREATE TABLE public."Roles" (
    id integer NOT NULL,
    "rolName" character varying(255) NOT NULL
);
    DROP TABLE public."Roles";
       public         heap    postgres    false            �            1259    80704    Roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Roles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public."Roles_id_seq";
       public          postgres    false    216                       0    0    Roles_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public."Roles_id_seq" OWNED BY public."Roles".id;
          public          postgres    false    215            �            1259    80712    Usuarios    TABLE     �  CREATE TABLE public."Usuarios" (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    apellido character varying(255) NOT NULL,
    direccion character varying(255) NOT NULL,
    celular character varying(255) NOT NULL,
    correo character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "RolId" integer
);
    DROP TABLE public."Usuarios";
       public         heap    postgres    false            b           2604    80748    Categorias id    DEFAULT     r   ALTER TABLE ONLY public."Categorias" ALTER COLUMN id SET DEFAULT nextval('public."Categorias_id_seq"'::regclass);
 >   ALTER TABLE public."Categorias" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            a           2604    80708    Roles id    DEFAULT     h   ALTER TABLE ONLY public."Roles" ALTER COLUMN id SET DEFAULT nextval('public."Roles_id_seq"'::regclass);
 9   ALTER TABLE public."Roles" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    80745 
   Categorias 
   TABLE DATA           2   COPY public."Categorias" (id, nombre) FROM stdin;
    public          postgres    false    219   �$                 0    80758 	   Productos 
   TABLE DATA           �   COPY public."Productos" (id, nombre, descripcion, precio, "cantidadEntrada", cantidad, "fechaEntrada", "fechaVencimiento", "createdAt", "updatedAt", "CategoriaId", "ProveedorId") FROM stdin;
    public          postgres    false    221   �$                 0    80751    Proveedores 
   TABLE DATA           Q   COPY public."Proveedores" (id, nombre, direccion, telefono, celular) FROM stdin;
    public          postgres    false    220   �$                  0    80705    Roles 
   TABLE DATA           0   COPY public."Roles" (id, "rolName") FROM stdin;
    public          postgres    false    216   �$                 0    80712    Usuarios 
   TABLE DATA           �   COPY public."Usuarios" (id, nombre, apellido, direccion, celular, correo, password, "createdAt", "updatedAt", "RolId") FROM stdin;
    public          postgres    false    217   +%                  0    0    Categorias_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Categorias_id_seq"', 2, true);
          public          postgres    false    218                       0    0    Roles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Roles_id_seq"', 2, true);
          public          postgres    false    215            h           2606    80750    Categorias Categorias_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Categorias"
    ADD CONSTRAINT "Categorias_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."Categorias" DROP CONSTRAINT "Categorias_pkey";
       public            postgres    false    219            l           2606    80764    Productos Productos_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "Productos_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."Productos" DROP CONSTRAINT "Productos_pkey";
       public            postgres    false    221            j           2606    80757    Proveedores Proveedores_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Proveedores"
    ADD CONSTRAINT "Proveedores_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."Proveedores" DROP CONSTRAINT "Proveedores_pkey";
       public            postgres    false    220            d           2606    80710    Roles Roles_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Roles" DROP CONSTRAINT "Roles_pkey";
       public            postgres    false    216            f           2606    80718    Usuarios Usuarios_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "Usuarios_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."Usuarios" DROP CONSTRAINT "Usuarios_pkey";
       public            postgres    false    217            n           2606    80765 $   Productos Productos_CategoriaId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "Productos_CategoriaId_fkey" FOREIGN KEY ("CategoriaId") REFERENCES public."Categorias"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Productos" DROP CONSTRAINT "Productos_CategoriaId_fkey";
       public          postgres    false    219    4712    221            o           2606    80770 $   Productos Productos_ProveedorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Productos"
    ADD CONSTRAINT "Productos_ProveedorId_fkey" FOREIGN KEY ("ProveedorId") REFERENCES public."Proveedores"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 R   ALTER TABLE ONLY public."Productos" DROP CONSTRAINT "Productos_ProveedorId_fkey";
       public          postgres    false    221    4714    220            m           2606    80719    Usuarios Usuarios_RolId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Usuarios"
    ADD CONSTRAINT "Usuarios_RolId_fkey" FOREIGN KEY ("RolId") REFERENCES public."Roles"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Usuarios" DROP CONSTRAINT "Usuarios_RolId_fkey";
       public          postgres    false    217    4708    216               %   x�3�LJ,*��I-�2�LLNN-�/��/����� ���            x������ � �            x������ � �             x�3�tt����2�u������� <��         Q  x���IO�0���+"׺^��������b��q��N�R~�� @�c;����X�0"!����J�e23�ot. �X@�2��{�	�°��W]nW��X���^4ߣ���ifHP�c��ՠ�fd5���DX�昄x��(�ԱZ�$⚄z��6��k�Fs���i#�#W��L��p�9���R��K����z��š��v���f0)�b8d�i7/�E�;�8�N}��M�s�ɥ&�f��Z�'��6�9�q�5�P|�@&7:N��7��B�V/�ǈu�I��MB� _/<ٲ}�������ę��
�Cqw�ch��IR�n}�@<E:2�j�úP?g�����`�շZ2�N��&z����&�����}Y��<]k��ʯ��b�ωaH�۠��7!�(N��(U���B�����ՙ�|%�讨��C��p��O�O|ڹn�:�Yw���}���,���S�#$�7OF3��	6i�� �PQ�����ilr���g��F��s�A��%{'��}�=̞�{,�s��IN�D����2_̳x[Tc+؆�r���ڈ����r��/����g�X     