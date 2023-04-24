/**
 * SIGN in USER with phone number
 * @swagger
 * /contact:
 *  post:
 *     summary: Save Contact form filled by the user to contact collections
 *     tags: ['Contact']
 *     description: get in touch with us
 *     name: Contact
 *     consumes:
 *          - application/json
 *     requestBody:
 *       description: Contact Form Data
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                access_token:
 *                  type: string
 *                  required: true
 *                  default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2RlYzk5NjY0ZWE3ZmQ1YTM1OTAzMiIsImlhdCI6MTY4MTc4MDMzMSwiZXhwIjoxNjk3MzMyMzMxfQ.7tNuoLe7wEFIiJKDdrrfHshcfH0FjFSTsRi88p553ZQ"
 *                object:
 *                  type: string
 *                  required: true
 *                  default: "proposal"
 *                message:
 *                  type: string
 *                  required: true
 *                  default: "message here"
 *     responses:
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Token failed
 *       201:
 *         description: Success contact form saved
 */
