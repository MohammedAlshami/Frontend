# import subprocess

# def run_command(command, cwd=None):
#     try:
#         process = subprocess.Popen(command, shell=True, cwd=cwd)
#         return process
#     except Exception as e:
#         print(f"Failed to start command: {command}\nError: {e}")
#         return None

# def main():
#     processes = []

#     # Run Node.js server (Server 1)
#     print("Starting Server 1 (npm)...")
#     processes.append(
#         run_command("npm run dev", cwd=r"C:\Users\USER\Desktop\Work\Competitions\MyHackathon\concept")
#     )

#     # Activate virtual environment and run Server 2
#     print("Starting Server 2 (Python)...")
#     processes.append(
#         run_command(
#             r"C:\Users\USER\Desktop\Work\drangue\Repos\BackendServer\nogpuenv\Scripts\activate && "
#             r"python C:\Users\USER\Desktop\Work\drangue\Repos\BackendServer\main.py"
#         )
#     )

#     # Activate virtual environment and run Server 3
#     print("Starting Server 3 (Python)...")
#     processes.append(
#         run_command(
#             r"C:\Users\USER\Desktop\Work\drangue\Repos\InferenceServer\gpuenv\Scripts\activate && "
#             r"python C:\Users\USER\Desktop\Work\drangue\Repos\InferenceServer\main.py"
#         )
#     )

#     print("All servers started. Press Ctrl+C to stop.")
#     try:
#         # Keep the script running while servers are running
#         for process in processes:
#             if process is not None:
#                 process.wait()
#     except KeyboardInterrupt:
#         print("\nShutting down servers...")
#         for process in processes:
#             if process is not None:
#                 process.terminate()

# if __name__ == "__main__":
#     main()

import json

# Load your JSON file
with open(r'C:\Users\USER\Desktop\Work\drangue\Repos\crop-monitoring\public\data\combined_zones copy.json', 'r') as file:
    geojson_list = json.load(file)

# Combine all features into one FeatureCollection
combined_geojson = {
    "type": "FeatureCollection",
    "features": []
}

for geojson in geojson_list:
    if geojson["type"] == "FeatureCollection":
        combined_geojson["features"].extend(geojson["features"])
    elif geojson["type"] == "Feature":  # If it's a single feature
        combined_geojson["features"].append(geojson)

# Save the combined GeoJSON
with open('combined_geojson.json', 'w') as file:
    json.dump(combined_geojson, file, indent=2)

print("Combined GeoJSON saved as 'combined_geojson.json'")
