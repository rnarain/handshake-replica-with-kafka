var kafka = require('../../kafka/client');

module.exports = {
  createEvent: (req, res) => {
    const payload = {
      path: 'create_event',
      data: req.body
    }
    kafka.make_request('event', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });
    // createEvent(req.body, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(201).json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  registerForEvent: (req, res) => {
    const payload = {
      path: 'register_for_event',
      data: req.body
    }
    kafka.make_request('event', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });
    // registerForEvent(req.body, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).json({
    //       success: 0,
    //       message: "Database connection errror"
    //     });
    //   }
    //   return res.status(200).json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getEventsByCompanyID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_events_by_company_id',
      id: id
    }
    kafka.make_request('event', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });
    // getEventsByCompanyID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getParticpantListByEventID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_particpant_list_by_event_id',
      id: id
    }
    kafka.make_request('event', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });
    // getParticpantListByEventID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getAllEventsByStudentID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_all_events_by_student_id',
      id: id
    }
    kafka.make_request('event', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });
    // getAllEventsByStudentID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },

  getAllEventRegistrationsByStudentID: (req, res) => {
    const id = req.params.id;
    const payload = {
      path: 'get_all_event_registrations_by_student_id',
      id: id
    }
    kafka.make_request('event', payload, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection errror"
        });
      }
      return res.status(201).json({
        success: 1,
        data: results
      });
    });

    // getAllEventRegistrationsByStudentID(id, (err, results) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    //   return res.json({
    //     success: 1,
    //     data: results
    //   });
    // });
  },


}


