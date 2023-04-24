/**
 * SIGN in USER with phone number
 * @swagger
 * /users/google-signin:
 *  post:
 *     summary: Login || Create user with google provider
 *     tags: ['Users']
 *     description: Create or login a user and generate token.
 *     name: User Sign UP
 *     consumes:
 *          - application/json
 *     requestBody:
 *       description: User data (firstname, lastname, email and image)
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  required: true
 *                  default: "dev.chikhaoui@gmail.com"
 *                lastname:
 *                  type: string
 *                  required: true
 *                  default: "Chikhaoui"
 *                firstname:
 *                  type: string
 *                  required: true
 *                  default: "Khalil"
 *                image:
 *                  type: string
 *                  required: false
 *                  default: null
 *     responses:
 *       400:
 *         description: Invalid data
 *       200:
 *         description: Success login and respond with user data
 */

/**
 * SIGN in USER With phone number
 * @swagger
 * /users/phone-signin:
 *  post:
 *     summary: Login || Create user with phone provider
 *     tags: ['Users']
 *     description: Create or login a user and generate token.
 *     name: User Sign UP
 *     consumes:
 *          - application/json
 *     requestBody:
 *       description: Phone number
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                phoneNumber:
 *                  type: string
 *                  required: true
 *                  default: "+21693142732"
 *     responses:
 *       400:
 *         description: Invalid data
 *       200:
 *         description: Success login and respond with user data
 */

/**
 * UPDATE USER DATA
 * @swagger
 * /users/update-user:
 *  put:
 *     summary: UPDATE | ADD VALUES ON USER DATA
 *     tags: ['Users']
 *     description: update user data docs update exist values or add new ones
 *     consumes:
 *          - application/json
 *     requestBody:
 *       description: token + key(s) - value(s)
 *       content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                access_token:
 *                  type: string
 *                  required: true
 *                  default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2RlYzk5NjY0ZWE3ZmQ1YTM1OTAzMiIsImlhdCI6MTY4MTc4MDMzMSwiZXhwIjoxNjk3MzMyMzMxfQ.7tNuoLe7wEFIiJKDdrrfHshcfH0FjFSTsRi88p553ZQ"
 *                lastname:
 *                  type: string
 *                  default: "Khalil"
 *     responses:
 *       201:
 *         description: user data updated
 *       409:
 *         description: email already used
 *       401:
 *         description: Token failed
 */
