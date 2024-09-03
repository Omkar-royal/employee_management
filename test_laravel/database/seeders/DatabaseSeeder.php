<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Deduction;
use App\Models\DeductionType;
use App\Models\Department;
use App\Models\Earning;
use App\Models\EarningType;
use App\Models\Employee;
use App\Models\Menu;
use App\Models\Salary;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\Employee::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'username' => 'Admin',
        //     'password' => bcrypt('Admin'),
        // ]);
        $user = User::where(
            'username',
            'Admin'
        )->exists();
        if (!$user) {
            User::updateOrCreate([
                'username' => 'Admin',
                'password' => bcrypt('Admin'),
            ]);
        }

        $departments =  [
            [
                'department_name' => 'Development'
            ],
            [
                'department_name' => 'Design'
            ],
            [
                'department_name' => 'Management'
            ],
            [
                'department_name' => 'Testing'
            ],
        ];

        foreach ($departments as $department) {
            Department::firstOrCreate($department);
        }
        $earnings = [
            ['earning_type' => 'Overtime Pay'],
            ['earning_type' => 'Bonuses'],
            ['earning_type' => 'Allowances'],
        ];

        foreach ($earnings as $earning) {
            EarningType::firstOrCreate($earning);
        }
        $deductions = [
            ['deduction_type' => 'Income Tax'],
            ['deduction_type' => 'Security Tax'],
            ['deduction_type' => 'Health Insurance Premiums'],
            ['deduction_type' => 'Provident Fund'],
            ['deduction_type' => 'Loan Repayments'],
        ];

        foreach ($deductions as $deduction) {
            DeductionType::firstOrCreate($deduction);
        }

        $menus = [
            [
                'label' => 'Employee Salaries',
                'link' => 'employees_salaries'
            ],
            [
                'label' => 'Employee List',
                'link' => 'employees_list'
            ],
            [
                'label' => 'Add Employee',
                'link' => 'add_employee'
            ],
            [
                'label' => 'Loans',
                'link' => 'add_loan'
            ],

        ];
        foreach ($menus as $menu) {
            Menu::firstOrCreate($menu);
        }
        Employee::factory()->count(10)->create();
        Salary::factory()->count(10)->create();
        Earning::factory()->count(30)->create();
        Deduction::factory()->count(30)->create();
    }
}
