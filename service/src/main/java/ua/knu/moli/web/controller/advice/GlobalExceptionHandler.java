package ua.knu.moli.web.controller.advice;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    /**
     * Error handling for not found exception.
     *
     * @param exception exception
     * @return NotFoundExceptionDto
     */
    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<ApplicationExceptionResponseDto> handleException(EmptyResultDataAccessException exception) {

        return new ResponseEntity<>(ApplicationExceptionResponseDto.builder()
                .message(exception.getMessage())
                .status(404)
                .build(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApplicationExceptionResponseDto> handleException(RuntimeException exception) {

        return new ResponseEntity<>(ApplicationExceptionResponseDto.builder()
                .message(exception.getMessage())
                .status(422)
                .build(), HttpStatus.UNPROCESSABLE_ENTITY);
    }

    /**
     * Error handling for invalid incoming params.
     * Example:
     * Expected request param 'Integer p_limit', but passed string 'someValue',
     * exception MethodArgumentTypeMismatchException.class will be thrown.
     *
     * @param exception exception
     * @return ApplicationExceptionDto
     */
    @ExceptionHandler({MethodArgumentTypeMismatchException.class, JpaObjectRetrievalFailureException.class})
    public ResponseEntity<ApplicationExceptionResponseDto> handleException(Exception exception) {
        return new ResponseEntity<>(ApplicationExceptionResponseDto.builder()
                .message(exception.getMessage())
                .status(400)
                .build(), HttpStatus.BAD_REQUEST);
    }
}
