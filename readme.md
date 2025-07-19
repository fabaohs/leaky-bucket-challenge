# Woovi Leaky Bucket Challenge

Leaky bucket is an algorithm used for rate limiting and traffic shaping in computer networks and distributed systems. It controls the rate at which requests are processed by maintaining a constant output flow, regardless of input bursts.

In the case of this challenge, I will use for limit the requests by user.

Bellow are my plan to implement this challenge

## TO DOs:

> ⚠️ **Disclaimer:** I used AI for format the TO DOs xD.
> ⚠️ **Disclaimer 2:** The to-do list may change as I go through the challenge. This list is just a general idea of how I plan to do this challenge.

## **Basic Authentication**

### **Simple User System**

- [ ... ] Create login endpoint that returns Bearer token
- [ ] Implement authentication middleware to validate tokens and extract user info

### **Basic Testing**

- [ ] Test login flow and token generation
- [ ] Test middleware with valid/invalid tokens

---

## **Leaky Bucket Core (Without Concurrency)**

### **Token Storage**

- [ ] Set up Redis connection
- [ ] Implement functions to get/set user tokens
- [ ] Initialize new users with default token amount

### **Basic Algorithm**

- [ ] Create function to check if user has available tokens
- [ ] Implement token consumption logic
- [ ] Implement token restoration logic with maximum limit

### **Rate Limiting Middleware**

- [ ] Create middleware to apply rate limiting
- [ ] Return appropriate error when no tokens available
- [ ] Consume token before processing request

---

## **Main PIX Route**

### **Basic Endpoint**

- [ ] Create PIX transaction endpoint with required fields
- [ ] Add input validation
- [ ] Simulate PIX processing with random success/failure
- [ ] Implement token logic based on transaction result

### **Complete Integration**

- [ ] Apply authentication middleware
- [ ] Apply rate limiting middleware
- [ ] Process transaction
- [ ] Update user tokens based on outcome
- [ ] Return appropriate response

### **Manual Testing**

- [ ] Test multiple requests within token limit
- [ ] Test request when tokens are exhausted
- [ ] Verify different token behavior for success vs failure

---

## **Hourly Token Worker**

### **Background Job**

- [ ] Create function to add tokens to all users
- [ ] Set up scheduled execution (hourly or configurable interval)
- [ ] Fetch all active users from storage
- [ ] Add tokens respecting maximum limit

### **Testing**

- [ ] Exhaust user tokens
- [ ] Wait for worker execution
- [ ] Verify token was added correctly

---

## **Idempotency System**

### **Idempotency Storage**

- [ ] Implement functions to get/save idempotency results
- [ ] Set up storage with TTL for cleanup
- [ ] Define data structure for cached results

### **Idempotency Middleware**

- [ ] Extract idempotency key from request headers
- [ ] Check if operation was already processed
- [ ] Return cached result if available
- [ ] Save result after processing new requests

### **Integration**

- [ ] Apply idempotency middleware to transaction endpoint
- [ ] Test with duplicate idempotency keys

---

## **Concurrency Control**

idk how I will implement this, for now...

---

## **Tests**

### **Leaky Bucket Tests**

- [ ] Test: new user starts with correct token amount
- [ ] Test: token consumption works correctly
- [ ] Test: rate limiting triggers when tokens exhausted
- [ ] Test: success/failure affects tokens differently
- [ ] Test: background worker adds tokens periodically

### **Idempotency Tests**

- [ ] Test: duplicate requests return same result
- [ ] Test: different requests process independently

### **Concurrency Tests**

- [ ] Test: simultaneous requests consume correct number of tokens
- [ ] Test: no race conditions allow excessive token consumption
