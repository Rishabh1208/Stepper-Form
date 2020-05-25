import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import User from './User';
import Address from './Address';
import Confirm from './Confirm';
import SuccessForm from './SuccessForm';
import Qualifications from './Qualification';

const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/);
const phoneRegex = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/);

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	button: {
		marginRight: theme.spacing(1),
	},
	completed: {
		display: 'inline-block',
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

function getSteps() {
	return ['User Information', 'Qualifications', 'Address', 'Confirmation'];
}

export default function StepperForm() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState({});
	const [fields, setFields] = useState({
		firstName: '',
		lastName: '',
		email: '',
		gender: '',
		date: '',
		city: '',
		phone: '',
		files: [],
		education: '',
		course: '',
		specialization: '',
		university: '',
		courseType: '',
	});

	// Copy fields as they all have the same name
	const [filedError, setFieldError] = useState({
		...fields,
	});

	const [isError, setIsError] = useState(false);
	const steps = getSteps();

	/*const totalSteps = () => {
		return steps.length; //4
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	}; */

	/*const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	}; */

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	/*const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	}; */

	/*const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	}; */
	const handleChangeFile = (files) => (event) => {
		const name = event.target.name;
		this.setState({ [name]: files });
	};
	const handleChange = (input) => ({ target: { value } }) => {
		// Set values to the fields
		setFields({
			...fields,
			[input]: value,
		});
		// Handle errors
		const formErrors = { ...filedError };
		const lengthValidate = value.length > 0 && value.length < 3;

		switch (input) {
			case 'firstName':
				formErrors.firstName = lengthValidate
					? 'Minimum 3 characaters required'
					: '';
				break;
			case 'lastName':
				formErrors.lastName = lengthValidate
					? 'Minimum 3 characaters required'
					: '';
				break;
			case 'email':
				formErrors.email = emailRegex.test(value)
					? ''
					: 'Invalid email address';
				break;
			case 'phone':
				formErrors.phone = phoneRegex.test(value)
					? ''
					: 'Please enter a valid phone number. i.e: xxx-xxx-xxxx';
				break;
			case 'city':
				formErrors.city = lengthValidate
					? 'Minimum 3 characaters required'
					: '';
				break;
			default:
				break;
		}

		// set error hook
		Object.values(formErrors).forEach((error) =>
			error.length > 0 ? setIsError(true) : setIsError(false)
		);
		// set errors hook
		setFieldError({
			...formErrors,
		});
	};
	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<User
						handleNext={handleNext}
						handleChange={handleChange}
						handleChangeFile={handleChangeFile}
						values={fields}
						isError={isError}
						filedError={filedError}
					/>
				);
			case 1:
				return (
					<Qualifications
						handleNext={handleNext}
						handleChange={handleChange}
						handleBack={handleBack}
						values={fields}
					/>
				);
			case 2:
				return (
					<Address
						handleNext={handleNext}
						handleBack={handleBack}
						handleChange={handleChange}
						values={fields}
						isError={isError}
						filedError={filedError}
					/>
				);
			case 3:
				return (
					<Confirm
						handleNext={handleNext}
						handleBack={handleBack}
						values={fields}
					/>
				);
			default:
				break;
		}
	}
	return (
		<div className={classes.root}>
			<Stepper nonLinear activeStep={activeStep}>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepButton
							onClick={handleStep(index)}
							completed={completed[index]}>
							{label}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<div>
				{steps.length === activeStep ? (
					<div>
						<Typography className={classes.instructions}>
							<SuccessForm />
						</Typography>
					</div>
				) : (
					<div>
						<Typography className={classes.instructions}>
							{getStepContent(activeStep)}
						</Typography>
						{/*<div>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}>
								Back
							</Button>
							<Button
								variant='contained'
								color='primary'
								onClick={handleNext}
								className={classes.button}>
								Next
							</Button>
							{activeStep !== steps.length &&
								(completed[activeStep] ? (
									<Typography variant='caption' className={classes.completed}>
										Step {activeStep + 1} already completed
									</Typography>
								) : (
									<Button
										variant='contained'
										color='primary'
										onClick={handleComplete}>
										{completedSteps() === totalSteps() - 1
											? 'Finish'
											: 'Complete Step'}
									</Button>
								))}
                    </div> */}
					</div>
				)}
			</div>
		</div>
	);
}
