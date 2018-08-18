// Reducer to be tested
import CourseReducer from '../../src/Reducers/CourseReducer';
import CourseConstants from '../../src/Constants/CourseConstants';

describe('CourseReducer', () => {
  test('CREATE_SUCCESS', () => {
    const action = {
      type: CourseConstants.CREATE_SUCCESS,
      newCourseId: 1,
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETALL_SUCCESS', () => {
    const action = {
      type: CourseConstants.GETALL_SUCCESS,
      courses: [],
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });

  test('GETUNSUBSCRIBED_SUCCESS', () => {
    const action = {
      type: CourseConstants.GETUNSUBSCRIBED_SUCCESS,
      courses: [],
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });

  test('DELETE_SUCCESS', () => {
    const action = {
      type: CourseConstants.DELETE_SUCCESS,
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOADCOURSE_SUCCESS', () => {
    const action = {
      type: CourseConstants.LOADCOURSE_SUCCESS,
      course: {id:1, name: 'aaa'},
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });

  test('EDIT_SUCCESS', () => {
    const action = {
      type: CourseConstants.EDIT_SUCCESS,
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });

  test('LOADCOURSES_SUCCESS', () => {
    const action = {
      type: CourseConstants.LOADCOURSES_SUCCESS,
      courses: [],
    };

    expect(CourseReducer(undefined, action)).toMatchSnapshot();
  });
});