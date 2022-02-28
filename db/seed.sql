USE eta_db;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Engineering");
INSERT into department (name) VALUES ("Finance");
INSERT into department (name) VALUES ("Legal");

-- Sales Roles
INSERT into role (role, salary, department_id) VALUES ("Salesperson", 18000, 1);
-- Engineering Roles
INSERT into role (role, salary, department_id) VALUES ("Lead Engineer", 20000, 2);
INSERT into role (role, salary, department_id) VALUES ("Software Engineer", 28000, 3);
-- Finance Roles
INSERT into role (role, salary, department_id) VALUES ("Account Manager", 17000, 4);
INSERT into role (role, salary, department_id) VALUES ("Accountant", 23000, 5);
-- Legal Roles
INSERT into role (role, salary, department_id) VALUES ("Legal Team Lead", 19000, 6);
INSERT into role (role, salary, department_id) VALUES ("Lawyer", 23000, 7);

--Sales Employees
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mike", "Chan", 1, null);
--Engineering Roles
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ashley", "Rodriquez", 2, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Tupik", 3, 3);
--Finance Roles
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kunal", "Singh", 4, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Malia", "Brown", 5, 5);
--Legal Roles
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Sara", "Lourd", 6, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Tommy", "Allen", 7, 6);
