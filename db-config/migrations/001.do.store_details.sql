CREATE TABLE IF NOT EXISTS store_details
(
    id varchar(5) NOT NULL,
    "name" varchar(80) NOT NULL,
    street_address varchar(100),
    city varchar(40),
    "state" varchar(40),
    comuna varchar(40),
    region_code varchar(10),
    region_name varchar(80),
    country varchar(80) NOT NULL,
    country_code varchar(3) NOT NULL,
    phone varchar(20),
    created_dt timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dt timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT store_details_pkey PRIMARY KEY (id)
)