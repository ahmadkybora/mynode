const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

/*app.use(express.static(path.join(__dirname, 'public')));*/

const io = require('socket.io')(http);
io.on('connection', socket => {
    console.log('Connected Ready');

    socket.on('sendMessage', msg => {
        socket.broadcast.emit('sendToAll', msg)
    });
});

const CategoriesTable = require('./database/migration/CategoriesTable.js');
const EmployeesTable = require('./database/migration/EmployeesTable.js');
const ProductsTable = require('./database/migration/ProductsTable.js');
const UsersTable = require('./database/migration/UsersTable.js');

const EmployeeRoutes = require('./routes/EmployeesRoutes.js');
const UserRoutes = require('./routes/UsersRoutes.js');
const CategoryRoutes = require('./routes/CategoriesRoutes.js');
const ProductRoutes = require('./routes/ProductsRoutes.js');
const AuthRoutes = require('./routes/AuthRoutes.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(CategoriesTable);
app.use(EmployeesTable);
app.use(ProductsTable);
app.use(UsersTable);

app.use('/api/panel/employees', EmployeeRoutes);
app.use('/api/panel/users', UserRoutes);
app.use('/api/panel/categories', CategoryRoutes);
app.use('/api/panel/products', ProductRoutes);
app.use('/api/panel/auth', AuthRoutes);


const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log('Server is running', PORT);
});

