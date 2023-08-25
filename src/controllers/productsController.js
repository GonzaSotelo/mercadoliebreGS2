const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	

	
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
		
	return	res.render('products',{
			products,
			toThousand

		})
		
	},

	
	detail: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'))
		const id = req.params.id;
		const product = products.find((product)=>product.id ===+id);
		return res.render('detail',{
			product,
			toThousand
		})
		
	},

	
	create: (req, res) => {
		return res.render('product-create-form')
		
	},
	
	
	store: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const {name,price, discount,category,description} = req.body;
		const product = {
			id:products[products.length-1].id+1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category,
			description: description.trim(),
			image: null

		}
		products.push(product)

		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(products,null,3))

		res.redirect('/products')
		
	},

	
	edit: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		const id= req.params.id;
		const product = products.find((product)=>product.id===+id)
		return res.render('product-edit-form',{
			...product
			}
			)
		
	},
	
	update: (req, res) => {
		const {name,price, discount,category,description} = req.body;
		const productModify = products.map((product=>{
			
			if(product.id=== +req.params.id){
				product.name= name.trim()
				product.price= +price
				product.discount= +discount
				product.category = category
				product.description= description.trim()

			}
			return product
		}))
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(productModify,null,3),'utf-8')
		
		return res.redirect('/products')

	
	},

	
	destroy : (req, res) => {
		
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		
		const productModify = products.filter(product => product.id !== +req.params.id)
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(productModify,null,3))

		return res.redirect('/products')

	}
};

module.exports =controller