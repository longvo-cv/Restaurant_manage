Testing branch upload  
Logged in as manager
Database management software: PostgreSQL ( 7 databases)

CREATE TABLE profiles (email varchar(200) unique not null, username varchar(100) UNIQUE NOT NULL, buildID SERIAL PRIMARY KEY, hashedpwd varchar(300), salt varchar(300));

CREATE TABLE customers (customer_id int, name varchar(150), email varchar(200), booking_id int, address_id int, order_id int, order_stat int, booking_stat int);   

CREATE TABLE addresses (address_id int, location varchar(500), item_id int);  

CREATE TABLE items (item_id int, type varchar(150), image varchar(500) ,ingredients varchar(500), name varchar(150), price decimal);  

CREATE TABLE delivery (deliver_id int, status varchar(50), employee_id int);  

CREATE TABLE orders (order_id int, item_id int, customer_id int , time varchar(100) , deliver_id int);  

CREATE TABLE banquets (customer_id int,booking_id int, hall_capacity int, price decimal, time varchar(100))

 # Databases (7 tables)
    - Profiles:  
        * email  
        * username  
        * buildID  
        * hashedpwd  
        * salt
    - Booking Banquets:  
        * customer_id  
        * booking_id    
        * hall_capacity  
        * price  
        * time  

    - Booking/food order:  
        - customer:  
            * customer_id
            * name  
            * email  
            * booking_id  
            * address_id
            * order_id  
            * order_stat  
            * booking_stat
        

        - delivery:  
            * deliver_id  
            * status  
            * employee_id  

        - address:  
            * address_id  
            * location  
        - order:  
            * order_id  
            * customer_id  
            * item_id  
            * time  
            * deliver_id  
        - items:  
            * item_id  
            * type  
            * image  
            * ingredients  
            * name  
            * type  
