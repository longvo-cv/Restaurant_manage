INSERT INTO addresses VALUES (2525, '25 Ly Thong Nhat street');
INSERT INTO addresses VALUES (2526, '1 Le Duan street');
INSERT INTO addresses VALUES (2527, '399 Tan Ki Tan quy street');
INSERT INTO addresses VALUES (2528, '18 Hoang Van Thu street');
INSERT INTO addresses VALUES (2529, '29 Nguyen Van Qua street');
INSERT INTO addresses VALUES (2530, '30 Nguyen Truong To street');

INSERT INTO delivery VALUES (20, 'Not delivered',3333);
INSERT INTO delivery VALUES (25, 'Not delivered',4444);
INSERT INTO delivery VALUES (30, 'Delivered',5555);
INSERT INTO delivery VALUES (40, 'Delivered',6666);
INSERT INTO delivery VALUES (50, 'Not delivered',7777);
INSERT INTO delivery VALUES (60, 'Not delivered',8888);

INSERT INTO orders VALUES (160, 100 ,123456, '30 minutes',20);
INSERT INTO orders VALUES (170, 110 ,234567, '15 minutes',30);
INSERT INTO orders VALUES (180, 125 ,345678, '45 minutes',60);

INSERT INTO customers VALUES (123456, 'Hai' ,'haithere@gmail.com',0,2526,160,1,0);
INSERT INTO customers VALUES (234567, 'lol' ,'lolplayer@gmail.com',0,2530,170,1,0);
INSERT INTO customers VALUES (345678, 'customer3' ,'customer3@gmail.com',0,2529,180,1,0);

INSERT INTO items VALUES (100, 'food' ,'https://c.ndtvimg.com/2019-12/5f6fg0l8_keraal-roast-chicken_625x300_14_December_19.jpg','chicken','fried chicken',9.99);
INSERT INTO items VALUES (110, 'drink' ,'https://image.shutterstock.com/image-photo/poltava-ukraine-march-22-2018-260nw-1071849443.jpg','pepsi','pepsi',1.99);
INSERT INTO items VALUES (125, 'food' ,'https://static01.nyt.com/images/2018/02/21/dining/00RICEGUIDE8/00RICEGUIDE8-articleLarge.jpg','rice','white rice',2.35);
