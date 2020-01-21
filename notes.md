## all columns and rows from the customers table
SELECT * FROM customers

## we can pick the columns we want to see 
SELECT CustomerID, CustomerName, Country, City
FROM customers

## filter the rows
SELECT CustomerID, CustomerName, Country, City
FROM customers
where country = 'Germany'

## sorting
SELECT CustomerID, CustomerName, Country, City
FROM customers
order by country, city

## descending by country and ascending (the default) by city
SELECT CustomerID, CustomerName, Country, City
FROM customers
order by country desc, city

## controlling how many records to return
select *
from products
limit 5

## pagination with order by, limit and offset
select *
from products
order by price desc
limit 5
offset 10

## adding records
insert into products (productName, supplierId, categoryId, unit, price)
values ('cake', 7, 1, 'one', 20.99)

## partial lookup
select * from [Products]
where productName like '%cake%'

select * from [Products]
where productName like 'cake%'

select * from [Products]
where productName like '%cake'

## updating records
update products
set price = 24.99
where productId = 79 // ALWAYS HAVE A WHERE FOR UPDATE AND DELETE

## updating multiple columns
update products
set price = 24.99, unit = 'Whole Cake'
where productId = 79 // ALWAYS HAVE A WHERE FOR UPDATE AND DELETE

## removing records
DELETE from [Products] 
where productId = 80



