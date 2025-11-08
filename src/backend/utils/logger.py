import os
import logging
from functools import wraps
import inspect


class NoGeoDataFrameSpam(logging.Filter):
    """
    Blocks geodataframe 'Next index' messages from log.

    This functions filters out the messages logged by the geopandas' geodataframe
    messages (line 630) to keep the log file cleaner.
    """

    def filter(sef, record):
        return not (
            record.pathname.endswith("geodataframe.py") and record.lineno == 630
        )


class NoGeoJsonSpam(logging.Filter):
    """
    Blocks geopandas 'unsupported OGR type' messages from log.

    This functions filters out the messages logged by the geopandas' geojson
    messages (line 198) to keep the log file cleaner.
    """

    def filter(sef, record):
        return not (record.pathname.endswith("raw.py") and record.lineno == 198)


class ConnectionpoolSpam(logging.Filter):
    """
    Blocks connectionpool messages from log.

    This functions filters out the messages logged by the connectionpool.py's messages
    to keep the log file cleaner.
    """

    def filter(sef, record):
        return not (record.pathname.endswith("connectionpool.py"))


class AnnotationError(logging.Filter):
    """
    Separates annotation errors into a separate log file.

    This function filters out error level log messages containing the
    'Annotation Error:' substring and logs them into a separate file that has the
    same name as the log file but ending with '_gt_errors.log'.
    """

    def filter(self, record):
        return record.getMessage().startswith("AnnotationError:")


def initialize_log(log_file: str, log_version: str, log_level=logging.DEBUG) -> None:
    # Log file path and destination folder setup
    log_dir = os.path.join(os.getcwd(), "output", log_version)
    if log_dir and not os.path.exists(log_dir):
        os.makedirs(log_dir, exist_ok=True)
    log_file_path = os.path.join(log_dir, log_file)

    # General logger setup
    general_log_handler = logging.FileHandler(log_file_path)
    general_log_handler.setLevel(log_level)
    general_log_handler.setFormatter(
        logging.Formatter(
            "[%(levelname).1s] - [%(asctime)s] - [%(filename)s::%(lineno)d]    %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
    )
    general_log_handler.addFilter(NoGeoDataFrameSpam())
    general_log_handler.addFilter(ConnectionpoolSpam())
    general_log_handler.addFilter(NoGeoJsonSpam())

    # Annotation error logger setup
    annotation_error_handler = logging.FileHandler(
        log_file_path.replace(".log", "_gt_errors.log")
    )
    annotation_error_handler.setLevel(logging.ERROR)
    annotation_error_handler.setFormatter(
        logging.Formatter(
            "[%(levelname).1s] - [%(asctime)s] - [%(filename)s::%(lineno)d]    %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
    )
    annotation_error_handler.addFilter(AnnotationError())

    # Add handlers to the logger
    logger = logging.getLogger()
    logger.setLevel(log_level)
    logger.addHandler(general_log_handler)
    logger.addHandler(annotation_error_handler)

    logging.getLogger("fiona").setLevel(logging.CRITICAL)
    logging.getLogger("osgeo").setLevel(logging.CRITICAL)
    logging.getLogger("geopandas").setLevel(logging.CRITICAL)


def log_io(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            logger = logging.getLogger(func.__module__)

            logger.info(f"Started running {func.__name__}...", stacklevel=2)

            signature = inspect.signature(func)
            params = signature.parameters

            paramstr = ""

            if args or len(params) > 1:
                for i, (name, _) in enumerate(params.items()):
                    if i < len(args):
                        if "self" == name:
                            continue
                        else:
                            paramstr += f"{name}: {args[i]}, "

                for name, value in kwargs.items():
                    paramstr += f"{name}: {value}, "

                paramstr = paramstr.rstrip(", ")

                if len(paramstr) > 0:

                    logger.debug(
                        f"The function {func.__name__} was called with arguments: {paramstr}",
                        stacklevel=2,
                    )

            result = func(*args, **kwargs)

            logger.info(f"{func.__name__} finished running", stacklevel=2)

            try:
                if hasattr(result, "empty"):
                    has_result = not result.empty
                elif result is not None:
                    has_result = True
                else:
                    has_result = False

                if has_result:
                    logger.debug(
                        f"The function {func.__name__} has return value(s): {result}",
                        stacklevel=2,
                    )
                else:
                    logger.debug(f"The function {func.__name__} has no return value")
            except ValueError:
                if result is not None:
                    logger.debug(
                        f"The function {func.__name__} returned a result",
                        stacklevel=2,
                    )
                else:
                    logger.debug(f"The function {func.__name__} has no return value")

            return result

        except Exception as e:
            logger.error(
                f"Error in decorator for {func.__name__}: {str(e)}", stacklevel=2
            )
            raise

    return wrapper
