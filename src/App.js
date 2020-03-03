import React, { useState } from 'react';
import { Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import SuccessModal from './common/SuccessModal';

const App = () => {

  let reportWritingSubjects = ['Short Reports', 'Annual Reports', 'Presentations'];
  let literatureSubjects = ['Poetry', 'Short Stories', 'Drama'];
  let computerScienceSubjects = ['Web Development', 'Desktop Software Development', 'Research and Analysis'];
  let allowedDates = ['20-12-2019', '15-01-2020', '01-03-2020'];

  const [formData, setFormData] = useState({
    course: '',
    subject: '',
    notes: ''
  });
  const { course, subject, notes } = formData;

  const [startDate, setStartDate] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [_errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        handleShow();
        clearFields();
      }, 1000);
    }
  }

  const validate = () => {
    let errors = {};

    if (course === '') {
      errors.course = 'Please choose course.';
    }

    if (course === '' && subject === '') {
      errors.subject = 'Please choose any course first.';
    }

    if (course && subject === '') {
      errors.subject = 'Please choose any subject.';
    }

    if (startDate === '') {
      errors.startDate = 'Please enter start date.';
    }

    if (startDate && !allowedDates.includes(moment(startDate).format('DD-MM-YYYY'))) {
      errors.startDate = 'Your selected course and subject is not offered beginning from your selected date.';
    }

    if (notes && (notes.length < 20 || notes.length > 500)) {
      errors.notes = 'Min length: 20 characters, Max length: 500 characters.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0 ? true : false;
  }

  const clearFields = e => {
    setFormData({
      course: '',
      subject: '',
      notes: ''
    });
    setStartDate('');
  }

  let subjectOptions = course === 'technical-report-writing' ? reportWritingSubjects :
    course === 'english-literature' ? literatureSubjects :
      course === 'computer-sciences' ? computerScienceSubjects : '';

  return (
    <>
      <h1 className="text-center">Demo Project</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="ml-3 mr-3" as={Row}>
          <Form.Label sm={2}>
            Courses
          </Form.Label>
          <Col sm={6}>
            <Form.Check
              type="radio"
              label="Technical Report Writing"
              name="course"
              id="technical-report-writing"
              value="technical-report-writing"
              checked={course === 'technical-report-writing'}
              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="English Literature"
              name="course"
              id="english-literature"
              value="english-literature"
              checked={course === 'english-literature'}

              onChange={handleChange}
            />
            <Form.Check
              type="radio"
              label="Computer Sciences"
              name="course"
              id="computer-sciences"
              value="computer-sciences"
              checked={course === 'computer-sciences'}

              onChange={handleChange}
            />
          </Col>
        </Form.Group>
        <Form.Group className="ml-3 mr-3">
          <Form.Label>Subjects</Form.Label>
          <Form.Control as="select" name="subject" value={subject} onChange={handleChange} isInvalid={_errors.subject}>
            <option value="">Choose subject</option>
            {subjectOptions && subjectOptions.map((item, index) => (
              <option value={item.toLowerCase().replace(' ', '-')} key={index}>{item}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">{_errors.subject}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="ml-3 mr-3">
          <Form.Label>Start Date</Form.Label>
          <DatePicker
            dateFormat='MMMM d, yyyy'
            className={_errors.startDate ? "form-control is-invalid" : "form-control"}
            selected={startDate}
            placeholderText="Start Date"
            // isClearable
            // highlightDates={['20-12-2019', '15-01-2020', '01-03-2020']}
            // includeDates={['20-12-2019', '15-01-2020', '01-02-2020']}
            onChange={date => setStartDate(date)}
          />
          {_errors.startDate && <small className="errorMessage">{_errors.startDate}</small>}
        </Form.Group>
        <Form.Group className="ml-3 mr-3">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            isInvalid={_errors.notes}
            rows="3"
            placeholder="Any additional notes here."
            name="notes"
            value={notes}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{_errors.notes}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="ml-3 mr-3 submit-button">
          {submitted ? <Spinner animation="border" /> : 'Submit'}
        </Button>
        <SuccessModal show={show} handleClose={handleClose} />
      </Form>
    </>
  );
}

export default App;