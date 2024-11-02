/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Public endpoints associated to user authentication.
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Authentication]
 *     summary: Create a new user
 *     description: This endpoint creates a new user and returns the user object.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *                 example: secret123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *       XXX:
 *         description: API Errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Authentication]
 *     summary: Login a user
 *     description: This endpoint allows a user to log in and returns a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *                 example: secret123
 *     responses:
 *       200:
 *         description: Login successful, returns the JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       XXX:
 *         description: API Errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
