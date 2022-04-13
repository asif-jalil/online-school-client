import React, { useEffect, useState } from "react";
import { Button, Dropdown, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import API from "utils/API";
import { APPROVED, BANNED } from "utils/status.const";

const Students = () => {
	const [state, setState] = useState({
		students: [],
		error: {}
	});
	const [changeStatus, setChangeStatus] = useState(false);

	useEffect(() => {
		API.get("/management/students")
			.then(res => res.data)
			.then(res => {
				setState(prev => ({ ...prev, students: res.students, error: {} }));
			})
			.catch(err => {
				toast.error(err.response?.data?.message);
				setState(prev => ({ ...prev, error: err.response?.data }));
			});
	}, [changeStatus]);

	const handleChangeStatus = (userId, status) => {
		setChangeStatus(false);

		API.put(`/management/status/${userId}`, {
			status: status
		})
			.then(res => res.data)
			.then(res => {
				setChangeStatus(true);
				toast.success(res.message);
			})
			.catch(err => {
				toast.error(err.response.data.message);
			});
	};

	const handleDeleteUser = userId => {
		setChangeStatus(false);

		API.delete(`/management/${userId}`)
			.then(res => res.data)
			.then(res => {
				setChangeStatus(true);
				toast.success(res.message);
			})
			.catch(err => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<>
			<h3>Students</h3>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Contact</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{state.students.map(student => (
						<tr key={student.id}>
							<td>{student.name}</td>
							<td>{student.email}</td>
							<td>{student.contact || "Not set"}</td>
							<td className="text-capitalize">{student.status}</td>
							<td>
								<Dropdown>
									<Dropdown.Toggle
										variant="light"
										size="sm"
										id="dropdown-basic"
									></Dropdown.Toggle>

									<Dropdown.Menu>
										<Dropdown.Item as="small" className="text-muted">
											Change User Status
										</Dropdown.Item>
										<Dropdown.Divider />
										{student.status === APPROVED && (
											<Dropdown.Item
												as={Button}
												variant="link"
												onClick={() => handleChangeStatus(student.id, BANNED)}
											>
												Ban
											</Dropdown.Item>
										)}
										{student.state === BANNED && (
											<Dropdown.Item
												as={Button}
												variant="link"
												onClick={() => handleChangeStatus(student.id, APPROVED)}
											>
												Approve
											</Dropdown.Item>
										)}
										<Dropdown.Item
											as={Button}
											variant="link"
											className="text-danger"
											onClick={() => handleDeleteUser(student.id)}
										>
											Remove
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default Students;
