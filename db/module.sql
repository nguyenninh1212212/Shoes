CREATE TABLE bill (
    id_bill VARCHAR(225) NULL,
    name_product VARCHAR(225) NOT NULL,
    name_customer VARCHAR(225) NULL,
    id_product VARCHAR(225) NULL,
    id_customer VARCHAR(225) NULL,
    PRIMARY KEY (id_bill)
);
CREATE TABLE customer (
    id_customer varchar(225) NULL,
    username varchar(255) NULL,
    password varchar(255) NULL,
    PRIMARY KEY (id_customer)
);
CREATE TABLE information_customer (
    id_customer VARCHAR(225) NULL,
    name_customer VARCHAR(225) NOT NULL,
    date_of_birth date NULL,
    conscious char(20) NOT NULL,
    wards char(20) NOT NULL,
    district char(20) NOT NULL,
    area VARCHAR(200) NULL,
    number_of_phone int NOT NULL,
    email VARCHAR(225) NULL,
    PRIMARY KEY (id_customer)
);
CREATE TABLE product (
    id_product varchar(225) NULL,
    name_product varchar(225) NOT NULL,
    price decimal(10, 2) NOT NULL,
    detail mediumtext NULL,
    origin varchar(255) NULL,
    size char(10) NULL,
    PRIMARY KEY (id_product)
);
ALTER TABLE bill
ADD CONSTRAINT FK_product_TO_bill FOREIGN KEY (id_product) REFERENCES product (id_product);
ALTER TABLE bill
ADD CONSTRAINT FK_customer_TO_bill FOREIGN KEY (id_customer) REFERENCES customer (id_customer);
ALTER TABLE information_customer
ADD CONSTRAINT FK_customer_TO_information_customer FOREIGN KEY (id_customer) REFERENCES customer (id_customer);
-- Bảng order
CREATE TABLE orders (
    id_order VARCHAR(225) NOT NULL,
    id_customer VARCHAR(225) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM(
        'pending',
        'processed',
        'shipped',
        'delivered',
        'cancelled'
    ) DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_order),
    FOREIGN KEY (id_customer) REFERENCES customer(id_customer)
);
-- Bảng order_detail
CREATE TABLE order_detail (
    id_order_detail VARCHAR(225) NOT NULL,
    id_order VARCHAR(225) NOT NULL,
    id_product VARCHAR(225) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (id_order_detail),
    FOREIGN KEY (id_order) REFERENCES orders(id_order),
    FOREIGN KEY (id_product) REFERENCES product(id_product)
);
CREATE TABLE payment (
    id_payment VARCHAR(225) NOT NULL,
    id_order VARCHAR(225) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_payment),
    FOREIGN KEY (id_order) REFERENCES orders(id_order)
);