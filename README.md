<h1>Employee Management System</h1>

<h2>Overview</h2>
<p>The Employee Management System (EMS) is a web application designed to manage employee data, including salary information, pay slips, and other HR-related tasks. The project uses Angular for the front end, PHP Laravel for the backend, and PL/SQL for the database.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#technology-stack">Technology Stack</a></li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li><a href="#installation">Installation</a>
        <ul>
            <li><a href="#clone-the-repository">Clone the Repository</a></li>
            <li><a href="#backend-setup-php-laravel">Backend Setup (PHP Laravel)</a></li>
            <li><a href="#front-end-setup-angular">Front End Setup (Angular)</a></li>
            <li><a href="#database-setup-plsql">Database Setup (PL/SQL)</a></li>
        </ul>
    </li>
    <li><a href="#running-the-application">Running the Application</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li>Add, update, and view employee information.</li>
    <li>Manage employee salaries.</li>
    <li>Generate and view pay slips.</li>
    <li>Role-based access control for Admin, HR, and Employees.</li>
</ul>

<h2 id="technology-stack">Technology Stack</h2>
<ul>
    <li><strong>Front End:</strong> Angular</li>
    <li><strong>Back End:</strong> PHP Laravel</li>
    <li><strong>Database:</strong> PL/SQL</li>
</ul>

<h2 id="prerequisites">Prerequisites</h2>
<p>Before you begin, ensure you have the following installed on your system:</p>
<ul>
    <li>Node.js (v14.x or later)</li>
    <li>Angular CLI (v12.x or later)</li>
    <li>Composer (latest version)</li>
    <li>PHP (v7.4 or later)</li>
    <li>Laravel (v8.x or later)</li>
    <li>Postgre Sql Database (PL/SQL)</li>
</ul>

<h2 id="installation">Installation</h2>

<h3 id="clone-the-repository">Clone the Repository</h3>
<pre><code>
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
</code></pre>

<h3 id="backend-setup-php-laravel">Backend Setup (PHP Laravel)</h3>
<p>Navigate to the backend directory:</p>
<pre><code>
cd test_laravel
</code></pre>

<p>Install the required dependencies using Composer:</p>
<pre><code>
composer install
</code></pre>

<p>Create a <code>.env</code> file by copying the example file:</p>
<pre><code>
cp .env.example .env
</code></pre>

<p>Generate the application key:</p>
<pre><code>
php artisan key:generate
</code></pre>

<p>Configure your database connection in the <code>.env</code> file:</p>
<pre><code>
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=test
DB_USERNAME=postgres
DB_PASSWORD=root
</code></pre>

<p>Run database migrations:</p>
<pre><code>
php artisan migrate
</code></pre>

<p>Start the Laravel development server:</p>
<pre><code>
php artisan serve --port 5000
</code></pre>

<h3 id="front-end-setup-angular">Front End Setup (Angular)</h3>
<p>Navigate to the frontend directory:</p>
<pre><code>
cd test_angular
</code></pre>

<p>Install the required dependencies using npm:</p>
<pre><code>
npm install
</code></pre>

<p>Update the API endpoint in the Angular environment configuration files (<code>src/environments/environment.ts</code>):</p>
<pre><code>
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'  // Laravel API URL
};
</code></pre>

<p>Start the Angular development server:</p>
<pre><code>
ng serve
</code></pre>


<p>Ensure that your Laravel application is correctly connected to the Oracle database and that the migrations have been applied successfully.</p>

<h2 id="running-the-application">Running the Application</h2>

<h3>Start the Backend Server:</h3>
<pre><code>
cd test_laravel
php artisan serve
</code></pre>
<p>The backend server will be running at <a href="http://localhost:5000">http://localhost:5000</a>.</p>

<h3>Start the Front End Server:</h3>
<pre><code>
cd test_angular
ng serve
</code></pre>
<p>The front end will be accessible at <a href="http://localhost:4200">http://localhost:4200</a>.</p>

<h3>Access the Application:</h3>
<p>Open your browser and navigate to <a href="http://localhost:4200">http://localhost:4200</a> to access the Employee Management System.</p>

<h2 id="license">License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

