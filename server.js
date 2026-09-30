import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import 'dotenv/config';

const app=express();
const db=new Database('freemart.sqlite');
app.use(cors());
app.use(express.json());

db.exec(`CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT,sku TEXT UNIQUE,name TEXT,region TEXT,category TEXT,price INTEGER,description TEXT,stock INTEGER DEFAULT 0,created_at TEXT DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY AUTOINCREMENT,order_no TEXT UNIQUE,customer_name TEXT,email TEXT,phone TEXT,address TEXT,city TEXT,state TEXT,pin TEXT,total INTEGER,status TEXT DEFAULT 'pending',payment_status TEXT DEFAULT 'unpaid',created_at TEXT DEFAULT CURRENT_TIMESTAMP); CREATE TABLE IF NOT EXISTS order_items(id INTEGER PRIMARY KEY AUTOINCREMENT,order_id INTEGER,sku TEXT,name TEXT,price INTEGER,qty INTEGER);`);
app.get('/api/health',(req,res)=>res.json({success:true,service:'FreeMart API',status:'online'}));
app.get('/api/products',(req,res)=>res.json({success:true,products:db.prepare('SELECT * FROM products ORDER BY id DESC').all()}));
app.post('/api/products',(req,res)=>{const p=req.body;const q=db.prepare('INSERT INTO products(sku,name,region,category,price,description,stock) VALUES(?,?,?,?,?,?,?)');const info=q.run(p.sku,p.name,p.region,p.category,p.price,p.description||'',p.stock??0);res.status(201).json({success:true,id:info.lastInsertRowid});});
app.get('/api/orders',(req,res)=>res.json({success:true,orders:db.prepare('SELECT * FROM orders ORDER BY id DESC').all()}));
app.post('/api/orders',(req,res)=>{const {customer,items,total}=req.body;if(!customer||!items?.length)return res.status(400).json({success:false,error:'customer and items are required'});const orderNo='FM'+Date.now().toString().slice(-8);const tx=db.transaction(()=>{const info=db.prepare('INSERT INTO orders(order_no,customer_name,email,phone,address,city,state,pin,total) VALUES(?,?,?,?,?,?,?,?,?)').run(orderNo,customer.name,customer.email,customer.phone,customer.address,customer.city,customer.state,customer.pin,total);const ins=db.prepare('INSERT INTO order_items(order_id,sku,name,price,qty) VALUES(?,?,?,?,?)');for(const x of items)ins.run(info.lastInsertRowid,x.sku,x.name,x.price,x.qty);return info.lastInsertRowid});tx();res.status(201).json({success:true,order_no:orderNo,status:'pending_payment'});});
app.listen(process.env.PORT||5000,()=>console.log(`FreeMart API running on http://localhost:${process.env.PORT||5000}`));
