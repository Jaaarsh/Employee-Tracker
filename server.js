// Import and require mysql2
const mysql = require('mysql');
//Import inquirer for questions
const inquirer = require('inquirer');
const { response } = require('express');
require('console.table');

// Set up onnecttion to database and connect to it
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Artemis1",
    database: "eta_db"
});

connection.connect((err) => {
    if (err) throw err;
    setupQuestions();
});

setupQuestions = () => {
    inquirer.prompt([
        {
        type: "list",
        name: "options",
        message: "What Will You Do?",
        choices: [
            "View Departments",
            "Add Department",
            "View Employees",
            "Add Employee",
            "View Roles",
            "Add Role",
        ]
    }
    ])
    .then((response) => {
        switch (response.options) {
            case "View Departments":
                viewDepartments();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "View Employees":
                viewEmployees();
                break;

            case "Add Employee":
                addEmployee();
                break;

            
            case "View Roles":
                viewRoles();
                break;

            case "Add Role":
                addRole();
                break;

        }
    })
};

//View Functions for the options in setupQuestions()
viewDepartments = () => {
    connection.query('SELECT * FROM department',
    (err, response) => {
        if (err) throw err
        console.table(response)
        setupQuestions();
    })
};

viewEmployees = () => {
    connection.query("SELECT * FROM employee",
    (err, response) => {
    if (err) throw err
    console.table(response)
    setupQuestions();
    })
};

viewRoles = () => {
    connection.query("SELECT * FROM role;",
    (err, response) => {
    if (err) throw err
    console.table(response)
    setupQuestions();
    })
};

// Add functions for the options in setupQuestions()

addDepartment = () => {
    inquirer.prompt([{
            type: 'input',
            name: 'department',
            message: 'What is the new Department?'
        }])
        .then((response) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: response.department
                },
            (err, response) => {
                if (err) throw err
                console.table(response);
                setupQuestions();
            })
        })
    };

addEmployee = () => {
    connection.query(`SELECT first_name FROM employee`,
    (err, response) => {
        if (err) throw err;
        const managers = response.map(({name}) => (name));

    connection.query(
        'SELECT role FROM role', (err, response) => {
        if (err) throw err;
        const rolesChoices = response.map(({role}) => (role));

    inquirer.prompt([{
                type: 'input',
                name: 'first_name',
                message: 'Enter Employee First Name'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter Employee Last Name'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Enter Employee Role',
                choices: rolesChoices
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the Manager?',
            }
        ]).then(response => {
            const { first_name, last_name, role, manager } = response;
            connection.query(
                'SELECT id FROM role WHERE role = ?', role,
                (err, response) => {
                    if (err) throw err;
                    const role_id = response.map(({ id }) => ( id ));
                    [].push(first_name, last_name, manager, role_id); 

                    connection.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: first_name,
                            last_name: last_name,
                            manager: manager,
                            role: role_id,
                        },
                        (err) => {
                            if (err) throw err;
                            setupQuestions();
                    })
                })
            })
        })
})};

addRole = () => {

    connection.query('SELECT name FROM department',
    (err, response) => {
        if (err) throw err;
        const departments = response.map(({name}) => (name));

    connection.query("SELECT role.new_role AS new_role, role.salary AS salary, FROM role,",
    (err, response) => {
        inquirer.prompt([
            {
                type: "input",
                name: "new_role",
                message: "What is the Role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the Role's Salary?"
            },
            {
                type: "list",
                name: "department",
                choices: departments
            }
        ]).then(function(response){
            connection.query(
                "INSERT INTO role SET ?", 
                {
                    role: response.new_role, 
                    salary: response.salary,
                    department: response.department
                },
                function(err) {
                    if (err) throw err
                    console.table(response);
                    setupQuestions();
                }
            )
        });
    });
}
)
};