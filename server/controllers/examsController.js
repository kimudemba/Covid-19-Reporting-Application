//const { execMap } = require('nodemon/lib/config/defaults')
const Exam = require('../models/examModel')




createExam = (req, res) => {
    const body = req.body;
    // console.log('----------------------- createItem: req -----------------------')
    // console.log(req);
    // console.log('----------------------- createItem: body -----------------------')
    // console.log(body);
  
    if (!body) {
      return res.status(400).json({
        success: false,
        error: 'You must provide an exam.',
      });
    }
  
    const exam = new Exam(body);
  
    if (!exam) {
      console.error(`[Hack.Diversity React Template] - 400 in 'createItem': 'item' is malformed.`);
      return res.status(400).json({
        success: false,
        message: "'item' is malformed",
      });
    }
  
    // console.log('----------------------- createItem: item -----------------------')
    // console.log(item);
  
    return exam
      .save()
      .then(() => {
        console.error(`[Hack.Diversity React Template] - 201 in 'createItem': Item created!`);
        return res.status(201).json({
          success: true,
          id: item._id,
          message: 'Item created!',
        });
      })
      .catch(err => {
        console.error(`[Hack.Diversity React Template] - caught error in 'createItem'`);
        Object.keys(err.errors).forEach(errorKey => {
          console.error(`[Hack.Diversity React Template] ERROR for: ${errorKey}`);
          console.error(
            `[Hack.Diversity React Template] => ${
              ((err.errors[errorKey] || {}).properties || {}).message
            }`,
          );
        });
        return res.status(400).json({
          success: false,
          error: err.errors,
          message: err.errors.name,
        });
      });
  };