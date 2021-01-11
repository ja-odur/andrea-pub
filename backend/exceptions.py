import abc
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


class AbstractUserError(Exception, metaclass=abc.ABCMeta):
    """ABC to indicate that such exceptions are due user providing invalid information.
    Such exceptions can inherit from this abstract class or simply implement the "send_exec_as_response
    attribute
    """

    @classmethod
    @abc.abstractmethod
    def send_exec_as_response(cls):
        """Abstract method for setting without an exception should be returned to the end-user as an http response

        : return: Boolean (True/False to-send/not-to-send a response)
        """
        pass

    @classmethod
    def __subclasshook__(cls, sub):
        """Method to check for subclasses and instances (including virtual sub-classes) of AbstractUserError

        :param sub (class): sub class to check
        :return: boolean True or NotImplemented
        """
        return (
            hasattr(sub, 'send_exec_as_response') and
            (sub.send_exec_as_response() if callable(sub.send_exec_as_response) else sub.send_exec_as_response) or
            NotImplemented
        )


def base_exception_handler(exc, context):
    """Call REST framework's default exception handler first,
    to get the standard error response. if no response, check if the exception
    is caused by user providing invalid data.
    """

    response = exception_handler(exc, context)
    if response is not None:
        response.data['status_code'] = response.status_code
        return response

    if isinstance(exc, AbstractUserError):
        data = {'detail': str(exc)}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)

    # TODO: here we have unhandled/unknown exception that needs to logged
