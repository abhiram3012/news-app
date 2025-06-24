from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StringType

# Create Spark Session
spark = SparkSession.builder \
    .appName("KafkaNewsProcessing") \
    .getOrCreate()

# Define Kafka Source
df = spark.readStream \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "user-interactions") \
    .option("startingOffsets", "latest") \
    .load()

# Define Schema for JSON Parsing
schema = StructType() \
    .add("articleId", StringType()) \
    .add("userId", StringType()) \
    .add("action", StringType())

# Convert Kafka message to DataFrame
json_df = df.select(from_json(col("value").cast("string"), schema).alias("data")).select("data.*")

# Write to Console (For Debugging)
query = json_df.writeStream \
    .outputMode("append") \
    .format("console") \
    .start()

query.awaitTermination()
