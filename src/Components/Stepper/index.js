// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { withStyles } from 'material-ui/styles';
// import Typography from 'material-ui/Typography';
// import { Link } from 'react-router-dom';
// import { submit } from 'redux-form';

// const styles = theme => ({
//   instructions: {
//     marginTop: theme.spacing.unit,
//     marginBottom: theme.spacing.unit,
//   },
//   flexEnd: {
//     display: 'flex',
//     justifyContent: 'flex-end',
//     margin: 'auto',
//     paddingTop: 10,
//     maxWidth: 800,
//   },
//   iconContainer: {
//     transform: 'scale(1.5)',
//   },
// });

// function getSteps(descriptionArray) {
//   return descriptionArray;
// }

// class Stepper extends React.Component {
//   static propTypes = {
//     classes: PropTypes.object,
//     description: PropTypes.array.isRequired,
//     content: PropTypes.array.isRequired,
//     dispatch: PropTypes.func.isRequired,
//     activeStep: PropTypes.number.isRequired,
//   };

//   componentWillMount() {
//     // Fallback if step of application is not at the start - 0
//     if (this.props.activeStep !== 0) {
//       this.handleReset();
//     }
//   }

//   handleNext = (formName) => {
//     this.props.dispatch(submit(formName));
//   };

//   handleBack = () => {
//     this.props.dispatch(moveStepperBackward());
//   };

//   handleReset = () => {
//     this.props.dispatch(resetStepper());
//   };

//   handleGoTo = (step) => {
//     this.props.dispatch(moveToStepper(step));
//   };

//   render() {
//     const { classes } = this.props;
//     const steps = getSteps(this.props.description);
//     const { activeStep } = this.props;
//     const activeForm = this.props.content[activeStep];
//     const { formName } = activeForm.props;

//     return (
//       <div className={classes.root}>
//         <div>
//           {activeStep === steps.length ? (
//             <div>
//               <Typography className={classes.instructions}>
//                 Summary Page
//               </Typography>
//               <Button onClick={this.handleReset} className={classes.button}>
//                 Reset
//               </Button>
//             </div>
//           ) : (
//             <div>
//               {activeForm}

//               <div className={classes.flexEnd}>
//                 {activeStep === 0 ? (
//                   <Link to="/home">
//                     <Button
//                       color="secondary"
//                       onClick={this.handleReset}
//                       className={classes.button}
//                       variant="raised"
//                     >
//                       Cancel
//                     </Button>
//                   </Link>
//                 ) : (
//                   <Button
//                     color="secondary"
//                     onClick={this.handleBack}
//                     className={classes.button}
//                     variant="raised"
//                   >
//                     Back
//                   </Button>
//                 )}
//                 <Button
//                   variant="raised"
//                   color="primary"
//                   onClick={() => this.handleNext(formName)}
//                   className={classes.button}
//                 >
//                   {activeStep === steps.length - 1 ? 'Request Quote' : 'Next'}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = createStructuredSelector({
//   activeStep: makeSelectActiveStep(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withReducer = injectReducer({ key: 'stepper', reducer });
// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(withReducer, withConnect, withStyles(styles))(Stepper);
