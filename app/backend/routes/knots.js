/*
 * Knots
 * Copyright 2018 data.world, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * This product includes software developed at
 * data.world, Inc. (http://data.world/).
 */

const router = require('express').Router();

const {
  getKnots,
  saveKnot,
  sync,
  deleteKnot,
  packageKnot,
  downloadKnot,
  partialSync,
  loadValues
} = require('../knots');

router.get('/', (req, res) => {
  getKnots()
    .then((knots) => res.json({ knots }))
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/save/', (req, res) => {
  const { knotName } = req.body;
  saveKnot(knotName)
    .then(() => {
      sync(req)
        .then(() => {
          res.json({});
        })
        .catch((error) => {
          res.status(500).json({ message: error.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/delete/', (req, res) => {
  const { knot } = req.body;
  deleteKnot(knot)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/download/', (req, res) => {
  const { knot } = req.body;
  packageKnot(knot)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.get('/download/', (req, res) => {
  downloadKnot(req, res);
});

router.post('/full-sync/', (req, res) => {
  sync(req)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/partial-sync/', (req, res) => {
  partialSync(req)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

router.post('/load/', (req, res) => {
  const { knot } = req.body;
  loadValues(knot)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;