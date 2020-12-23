Testing branch upload  
Logged in as manager

CREATE TABLE profiles (email varchar(200) unique not null, username varchar(100) UNIQUE NOT NULL, buildID SERIAL PRIMARY KEY, hashedpwd varchar(300), salt varchar(300));

CREATE TABLE customers (customer_id int, name varchar(150), email varchar(200), booking_id int, address_id int, order_id int, order_stat int, booking_stat int);   

CREATE TABLE addresses (address_id int, location varchar(500));  

CREATE TABLE items (item_id int, type varchar(150), image varchar(500) ,ingredients varchar(500), name varchar(150), price decimal);  

CREATE TABLE delivery (deliver_id int, status varchar(50), employee_id int);  

CREATE TABLE orders (order_id int, item_id int, customer_id int , time varchar(100) , deliver_id int);  


Databases:  
    - Booking Banquets:  
        + duration  
        + time  
        + banquet:  
            +hall_id  
            +capacity  
            +price  
    - Booking/food order:  
        customer:  
        + name  
        + email  
        + customer_id  
        + bookingTime  
        + booking_id  
        + order_id  
    + delivery:  
            + customer_id  
            + status:  
            + time  
            + employee: 
                + employee_id  
    + address:  
            + address_id  
            + location  
    + order:  
            + price  
            + order_id  
            + time  
        + items:  
                + item_id  
                + type  
                + ingredients  
                + name  
                + price  