import express from 'express';
import { employeeModel } from '../db/employee';

class EmployeeController {
    getAllEmployee = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const employees = await employeeModel.find();
            response.status(200).json({ data: employees });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(500).json({ error: 'Failed to retrieve employees', details: error.message });
            } else {
                response.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };
    
    getEmployee = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { id } = request.params;
            const employee = await employeeModel.findById(id);
            if (!employee) {
                response.status(404).json({ message: 'Employee not found' });
                return;
            }
            response.status(200).json({ data: employee });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(500).json({ error: 'Failed to retrieve the employee', details: error.message });
            } else {
                response.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };

    createEmployee = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { name, email, mobile, dob, doj } = request.body;
            const employee = new employeeModel({ name, email, mobile, dob, doj });
            await employee.save();
            response.status(201).json({ message: 'Employee created successfully', data: employee });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(500).json({ error: 'Failed to create employee', details: error.message });
            } else {
                response.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };
    
    
    updateEmployee = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { id } = request.params;
            const { name, email, mobile, dob, doj } = request.body;
            const employee = await employeeModel.findById(id);
            if (!employee) {
                response.status(404).json({ message: 'Employee not found' });
                return;
            }
            employee.name = name || employee.name;
            employee.email = email || employee.email;
            employee.mobile = mobile || employee.mobile;
            employee.dob = dob || employee.dob;
            employee.doj = doj || employee.doj;
            await employee.save();
            response.status(200).json({ message: 'Employee updated successfully', data: employee });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(500).json({ error: 'Failed to update employee', details: error.message });
            } else {
                response.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };
    
    deleteEmployee = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const { id } = request.params;
            const employee = await employeeModel.findByIdAndDelete(id);
            if (!employee) {
                response.status(404).json({ message: 'Employee not found' });
                return;
            }
            response.status(200).json({ message: 'Employee deleted successfully' });
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(500).json({ error: 'Failed to delete employee', details: error.message });
            } else {
                response.status(500).json({ error: 'Unknown error occurred' });
            }
        }
    };    
}

export default new EmployeeController();
