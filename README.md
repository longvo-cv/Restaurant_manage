Testing branch upload  
Logged in as manager

CREATE TABLE profiles (email varchar(200) unique not null, username varchar(100) UNIQUE NOT NULL, buildID SERIAL PRIMARY KEY, hashedpwd varchar(300), salt varchar(300));



Databases:  
    - Booking Banquets:  
        + duration  
        + time  
        + banquet:  
            +hall_id  
            +capacity  
            +price  
    - Booking/  food order:  
        customer:  
        + customer_id  
        + bookingTime  
        + bookingPrice  
        + booking_id  
        + delivery:  
            + status:  
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